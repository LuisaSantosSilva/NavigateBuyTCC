import os

# Configurações do Flask
class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/bdnavigate'
    secret_key = os.getenv('SECRET_KEY')
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'