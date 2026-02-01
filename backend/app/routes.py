from flask import Blueprint, jsonify, request
import json
import bcrypt
import uuid
from .db import execute_sql

api = Blueprint('api', __name__)

@api.get("/health")
def health():
   return jsonify({ "success": True, "status": "ok" }) 


@api.get("/time")
def time():
    row = execute_sql("SELECT now()", fetch="one")
    print(row[0])
    return jsonify({"success": True})



@api.get("/active-notes")
def get_active_notes():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400
    
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"success": False, "error": "Missing user_id"}), 400    
    
    sql = "SELECT * FROM notes.notes WHERE user_id = %s AND deleted_at IS NULL ORDER BY updated_at DESC"
    rows = execute_sql(sql, (user_id,))
    return jsonify({"success": True, "rows": rows})



@api.get("/deleted-notes")
def get_deleted_notes():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400
    
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"success": False, "error": "Missing user_id"}), 400    
    
    sql = "SELECT * FROM notes.notes WHERE user_id = %s AND deleted_at IS NOT NULL ORDER BY updated_at DESC"
    rows = execute_sql(sql, (user_id,))
    return jsonify({"success": True, "rows": rows})


@api.post("/register")
def register():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    required_keys = ["email", "username", "password"]
    missing = [k for k in required_keys if not data.get(k)]
    if missing:
        return jsonify({"success": False, "error": "Missing required fields", "missing": missing}), 400

    user_id = str(uuid.uuid4())

    email = data["email"].strip().lower()
    username = data["username"].strip()
    password = data["password"]

    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    sql = """
        INSERT INTO notes.users (user_id, email, username, password_hash)
        VALUES (%s, %s, %s, %s)
    """
    params = (user_id, email, username, password_hash)

    try:
        execute_sql(sql, params, fetch=None)
        return jsonify({"success": True, "user_id": user_id}), 201
    except Exception as e:
        # Ideally catch unique-constraint violation specifically
        return jsonify({"success": False, "error": "Could not register user"}), 400

@api.post("/notes")
def create_note():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    required_keys = ["user_id", "title", "body"]
    missing = [k for k in required_keys if data.get(k) is None]
    if missing:
        return jsonify({"success": False, "error": "Missing required fields", "missing": missing}), 400

    note_id = str(uuid.uuid4())
    user_id = data["user_id"]
    title = data["title"]
    body = data["body"]

    sql = """
        INSERT INTO notes.notes (note_id, user_id, title, body, created_at, updated_at, deleted_at)
        VALUES (%s, %s, %s, %s, NOW(), NOW(), NULL)
        RETURNING note_id
    """
    params = (note_id, user_id, title, body)

    try:
        row = execute_sql(sql, params, fetch="one")
        return jsonify({"success": True, "note_id": row[0]}), 201
    except Exception:
        return jsonify({"success": False, "error": "Could not create note"}), 400



@api.delete("/delete-temp")
def soft_delete_note():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    required_keys = ["user_id", "note_id"]
    missing = [k for k in required_keys if not data.get(k)]
    if missing:
        return jsonify({"success": False, "error": "Missing required fields", "missing": missing}), 400

    user_id = data["user_id"]
    note_id = data["note_id"]

    sql = """
        UPDATE notes.notes
        SET deleted_at = NOW()
        WHERE user_id = %s AND note_id = %s AND deleted_at IS NULL
        RETURNING note_id
    """
    params = (user_id, note_id)

    try:
        res = execute_sql(sql, params, fetch="one")  # adjust to your helper
        if not res:
            return jsonify({"success": False, "error": "Note not found (or already deleted)"}), 404
        return jsonify({"success": True}), 200
    except Exception:
        return jsonify({"success": False, "error": "Could not delete note"}), 400


@api.delete("/delete")
def hard_delete_note():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    required_keys = ["user_id", "note_id"]
    missing = [k for k in required_keys if not data.get(k)]
    if missing:
        return jsonify({"success": False, "error": "Missing required fields", "missing": missing}), 400

    user_id = data["user_id"]
    note_id = data["note_id"]

    sql = """
        DELETE FROM notes.notes
        WHERE user_id = %s AND note_id = %s AND deleted_at IS NOT NULL
        RETURNING note_id
    """
    params = (user_id, note_id)

    try:
        res = execute_sql(sql, params, fetch="one")  # adjust to your helper
        if not res:
            return jsonify({"success": False, "error": "Note not found in trash"}), 404
        return jsonify({"success": True}), 200
    except Exception:
        return jsonify({"success": False, "error": "Could not permanently delete note"}), 400

@api.patch("/restore")
def restore_note():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    required_keys = ["user_id", "note_id"]
    missing = [k for k in required_keys if not data.get(k)]
    if missing:
        return jsonify({"success": False, "error": "Missing required fields", "missing": missing}), 400

    user_id = data["user_id"]
    note_id = data["note_id"]

    sql = """
        UPDATE notes.notes
        SET deleted_at = NULL
        WHERE user_id = %s AND note_id = %s AND deleted_at IS NOT NULL
        RETURNING note_id
    """
    params = (user_id, note_id)

    try:
        row = execute_sql(sql, params, fetch="one")
        if not row:
            return jsonify({"success": False, "error": "Note not found in trash"}), 404

        return jsonify({"success": True, "note_id": row[0]}), 200
    except Exception:
        return jsonify({"success": False, "error": "Could not restore note"}), 400
    

@api.patch("/notes")
def update_note():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    required_keys = ["user_id", "note_id"]
    missing = [k for k in required_keys if not data.get(k)]
    if missing:
        return jsonify({"success": False, "error": "Missing required fields", "missing": missing}), 400

    user_id = data["user_id"]
    note_id = data["note_id"]

    # allow partial updates
    title = data.get("title")
    body = data.get("body")
    if title is None and body is None:
        return jsonify({"success": False, "error": "Provide title and/or body"}), 400

    # Build dynamic SET safely (still parameterized)
    set_parts = []
    params = []

    if title is not None:
        set_parts.append("title = %s")
        params.append(title)

    if body is not None:
        set_parts.append("body = %s")
        params.append(body)

    set_parts.append("updated_at = NOW()")

    sql = f"""
        UPDATE notes.notes
        SET {", ".join(set_parts)}
        WHERE user_id = %s AND note_id = %s AND deleted_at IS NULL
        RETURNING note_id
    """
    params.extend([user_id, note_id])

    try:
        row = execute_sql(sql, tuple(params), fetch="one")
        if not row:
            return jsonify({"success": False, "error": "Note not found (or is deleted)"}), 404
        return jsonify({"success": True, "note_id": row[0]}), 200
    except Exception:
        return jsonify({"success": False, "error": "Could not update note"}), 400
