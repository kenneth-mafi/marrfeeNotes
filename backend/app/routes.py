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
    rows = execute_sql(sql, user_id)
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
    rows = execute_sql(sql, user_id)
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

