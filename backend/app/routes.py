from flask import Blueprint, jsonify, request
import json
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