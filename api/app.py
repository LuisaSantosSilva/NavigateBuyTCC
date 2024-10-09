import os
from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import api

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "PUT", "OPTIONS"]}})

# Configurações do Flask
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'default_secret_key')
app.config['SESSION_COOKIE_SECURE'] = False  
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config.from_object(Config)

# Inicializando o SQLAlchemy
db.init_app(app)    

# Registrando o blueprint
app.register_blueprint(api, url_prefix='/app')

if __name__ == '__main__':
    app.run(port=5000, debug=True)