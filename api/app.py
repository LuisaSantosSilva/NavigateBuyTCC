import os
from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import api

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "OPTIONS"], "supports_credentials": True}})

# Configurações do Flask
app.secret_key = os.getenv('SECRET_KEY')
app.config.from_object(Config)
    
# Inicializando o SQLAlchemy
db.init_app(app)    

# Registrando o blueprint
app.register_blueprint(api, url_prefix='/app')

if __name__ == '__main__':
    app.run(port=5000, debug=True)