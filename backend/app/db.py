import os
from pathlib import Path
import psycopg

_BASE_DIR = Path(__file__).resolve().parent
_SCHEMA_PATH = _BASE_DIR / "schema.sql"


def execute_sql(sql, params=None, fetch="all"):
    db_uri = os.getenv("MARRFEE_OS_DB_URI")
    if not db_uri:
        raise ValueError("Missing Database uri")
    with psycopg.connect(db_uri) as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            if fetch == "one":
                return cur.fetchone()
            if fetch in ("none", None):
                return None
            return cur.fetchall()
        

def load_schema_sql() -> str:
    if not _SCHEMA_PATH.exists():
        raise FileNotFoundError(f"Missing schema file at {_SCHEMA_PATH}")
    return _SCHEMA_PATH.read_text(encoding="utf-8")

def create_schema():
    schema_sql = load_schema_sql()
    execute_sql(schema_sql, fetch="none")