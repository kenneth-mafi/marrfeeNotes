from flask import Flask
from flask_cors import CORS

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

    return app
    