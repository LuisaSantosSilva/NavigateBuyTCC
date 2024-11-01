from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=False, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    avatar = db.Column(db.String(300))
    password_reset_requested = db.Column(db.Boolean, default=False)
    products = db.relationship('Produtos', backref='owner', lazy=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class CodigoDeConfirmacao(db.Model):
    __tablename__ = 'confirmacoes'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), nullable=False)
    code = db.Column(db.String(6), nullable=False)

class Produtos(db.Model):
    __tablename__ = 'produtos'
    id = db.Column(db.Integer, primary_key=True)
    título = db.Column(db.String(255), nullable=False)
    preço = db.Column(db.String(255), nullable=False)
    imagem = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(255), nullable=False)
    loja = db.Column(db.String(255), nullable=False)
    receber_alerta = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

'''
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    avatar VARCHAR(300),
    password_reset_requested BOOLEAN DEFAULT FALSE
);

CREATE TABLE confirmacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) NOT NULL,
    code VARCHAR(6) NOT NULL
);

CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    título VARCHAR(255) NOT NULL,
    preço VARCHAR(255) NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    loja VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    receber_alerta BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
'''