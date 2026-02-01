from flask import Flask
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from .task import purge_old_deleted_notes

def start_scheduler():
    scheduler = BackgroundScheduler(timezone="Europe/Stockholm")
    scheduler.add_job(purge_old_deleted_notes, "cron", hour=3, minute=0)  # every day 03:00
    scheduler.start()
    return scheduler

def create_app():
    try:
        from .config import Config
    except ImportError:
        from config import Config
    
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, origins=[
        "http://localhost:5173", 
        "http://localhost:4000",  
    ]) 

    from .routes import api
    app.register_blueprint(api, url_prefix="/api")
    scheduler = start_scheduler()
    return app
    