from flask import Blueprint, jsonify, request
import json
import uuid
from .db import execute_sql
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt

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
@jwt_required()
def get_active_notes():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"success": False, "error": "Missing user_id"}), 400    
    
    sql = """
        SELECT note_id, title, body, updated_at, created_at, is_code
        FROM notes.notes
        WHERE user_id = %s AND deleted_at IS NULL
        ORDER BY updated_at DESC
    """
    rows = execute_sql(sql, (user_id,))
    notes = [
        { 
            "noteId": r[0], 
            "title": r[1], 
            "body": r[2], 
            "updatedAt": r[3].isoformat()[0:10], 
            "createdAt": r[4].isoformat()[0:10],
            "isCode": r[5],
        }
        for r in rows
    ]
    return jsonify({"success": True, "rows": notes}), 200



@api.get("/deleted-notes")
@jwt_required()
def get_deleted_notes():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"success": False, "error": "Missing user_id"}), 400    
    
    sql = """
        SELECT note_id, title, body, updated_at, created_at, deleted_at, is_code
        FROM notes.notes
        WHERE user_id = %s AND deleted_at IS NOT NULL
        ORDER BY updated_at DESC
    """
    rows = execute_sql(sql, (user_id,))
    notes = [
        {
            "noteId": r[0], 
            "title": r[1], 
            "body": r[2], 
            "deletedAt": r[3].isoformat()[0:10], 
            "createdAt": r[4].isoformat()[0:10], 
            "deletedAt": r[5].isoformat()[0:10],
            "isCode": r[6],
        }
        for r in rows
    ]
    return jsonify({"success": True, "rows": notes}), 200



@api.post("/notes")
@jwt_required()
def create_note():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    note_id = str(uuid.uuid4())
    title = data.get("title", "")
    body = data.get("body", "")
    is_code = bool(data.get("is_code", False))

    sql = """
        INSERT INTO notes.notes (note_id, user_id, title, body, created_at, updated_at, deleted_at, is_code)
        VALUES (%s, %s, %s, %s, NOW(), NOW(), NULL, %s)
        RETURNING note_id
    """
    params = (note_id, user_id, title, body, is_code)

    try:
        row = execute_sql(sql, params, fetch="one")
        return jsonify({"success": True, "note_id": row[0]}), 201
    except Exception:
        return jsonify({"success": False, "error": "Could not create note"}), 400



@api.delete("/delete-temp")
@jwt_required()
def soft_delete_note():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    note_id = data.get("note_id")
    if not note_id:
        return jsonify({"success": False, "error": "Missing note_id"}), 400

    sql = """
        UPDATE notes.notes
        SET deleted_at = NOW()
        WHERE user_id = %s AND note_id = %s AND deleted_at IS NULL
        RETURNING note_id
    """
    params = (user_id, note_id)

    try:
        res = execute_sql(sql, params, fetch="one")
        if not res:
            return jsonify({"success": False, "error": "Note not found (or already deleted)"}), 404
        return jsonify({"success": True}), 200
    except Exception:
        return jsonify({"success": False, "error": "Could not delete note"}), 400


@api.delete("/delete")
@jwt_required()
def hard_delete_note():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    note_id = data.get("note_id")
    if not note_id:
        return jsonify({"success": False, "error": "Missing note_id"}), 400

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
@jwt_required()
def restore_note():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    note_id = data.get("note_id")
    if not note_id:
        return jsonify({"success": False, "error": "Missing note_id"}), 400


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
@jwt_required()
def update_note():
    user_id = get_jwt_identity()
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    note_id = data.get("note_id")
    if not note_id:
        return jsonify({"success": False, "error": "Missing note_id"}), 400

    # allow partial updates
    title = data.get("title")
    body = data.get("body")
    is_code = data.get("is_code")
    if title is None and body is None and is_code is None:
        return jsonify({"success": False, "error": "Provide title, body, and/or is_code"}), 400

    
    # Build dynamic SET safely (still parameterized)
    set_parts = []
    params = []
    change_checks = []
    change_params = []

    if title is not None:
        set_parts.append("title = %s")
        params.append(title)
        change_checks.append("title IS DISTINCT FROM %s")
        change_params.append(title)

    if body is not None:
        set_parts.append("body = %s")
        params.append(body)
        change_checks.append("body IS DISTINCT FROM %s")
        change_params.append(body)

    if is_code is not None:
        set_parts.append("is_code = %s")
        params.append(bool(is_code))
        change_checks.append("is_code IS DISTINCT FROM %s")
        change_params.append(bool(is_code))

    set_parts.append("updated_at = NOW()")

    change_clause = ""
    if change_checks:
        change_clause = f"AND ({' OR '.join(change_checks)})"

    sql = f"""
        UPDATE notes.notes
        SET {", ".join(set_parts)}
        WHERE user_id = %s AND note_id = %s AND deleted_at IS NULL
        {change_clause}
        RETURNING note_id
    """
    params.extend([user_id, note_id])
    params.extend(change_params)

    try:
        row = execute_sql(sql, tuple(params), fetch="one")
        if not row:
            
            exists = execute_sql(
                "SELECT 1 FROM notes.notes WHERE user_id = %s AND note_id = %s AND deleted_at IS NULL",
                (user_id, note_id),
                fetch="one"
            )
            if exists:
                return jsonify({"success": True, "updated": False}), 200  # no change
            return jsonify({"success": False, "error": "Note not found"}), 404

        return jsonify({"success": True, "updated": True, "note_id": row[0]}), 200

    except Exception:
        return jsonify({"success": False, "error": "Could not update note"}), 400




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
        access_token = create_access_token(identity=user_id)
        return jsonify({ "success": True, "access_token": access_token }), 201
    except Exception as e:
        # Ideally catch unique-constraint violation specifically
        return jsonify({"success": False, "error": "Could not register user", "e": e}), 400



@api.post("/login")
def login():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "error": "Expected JSON object"}), 400

    username = data.get("username").strip().lower()
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "error": "Missing username or password"}), 400

    # Get user by username
    sql = "SELECT user_id, password_hash FROM notes.users WHERE username = %s"
    row = execute_sql(sql, (username,), fetch="one")
    if not row:
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

    user_id, password_hash = row[0], row[1]

    # bcrypt needs bytes
    ok = bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    if not ok:
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

    # Put user_id inside the token as the identity
    access_token = create_access_token(identity=str(user_id))

    return jsonify({"success": True, "access_token": access_token}), 200
