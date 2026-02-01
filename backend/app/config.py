from dotenv import load_dotenv
import os

_BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
load_dotenv(os.path.join(_BASE_DIR, ".env"))

class Config:
    DEBUG = os.getenv("FLASK_DEBUG")
    DATABASE_URL = os.getenv("MARRFEE_OS_DB_URI")