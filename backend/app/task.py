from .db import execute_sql

def purge_old_deleted_notes():
    sql = """
        DELETE FROM notes.notes
        WHERE deleted_at IS NOT NULL
          AND deleted_at < NOW() - INTERVAL '30 days';
    """
    execute_sql(sql, fetch=None)
