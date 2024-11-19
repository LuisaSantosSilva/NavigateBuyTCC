from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'consumidor'
    id_consumidor = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(150), unique=False, nullable=False)
    email_consumidor = db.Column(db.String(150), unique=True, nullable=False)
    senha_consumidor= db.Column(db.String(200), nullable=False)
    avatar = db.Column(db.String(250), nullable=True)
    requisicao_alterar_senha = db.Column(db.Boolean, default=False)
    products = db.relationship('Produtos', backref='owner', lazy=True)

    def set_senha(self, senha_consumidor):
        self.senha_consumidor = generate_password_hash(senha_consumidor)
    
    def checar_senha(self, senha_consumidor):
        return check_password_hash(self.senha_consumidor, senha_consumidor)

class CodigoDeConfirmacao(db.Model):
    __tablename__ = 'confirmacoes'
    id = db.Column(db.Integer, primary_key=True)
    email_consumidor = db.Column(db.String(150), nullable=False)
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
    usuario_id = db.Column(db.Integer, db.ForeignKey('consumidor.id_consumidor'), nullable=False)

'''
CREATE TABLE consumidor (
    id_consumidor INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(150) NOT NULL,
    email_consumidor VARCHAR(150) UNIQUE NOT NULL,
    senha_consumidor VARCHAR(200) NOT NULL,
    avatar VARCHAR(250),
    requisicao_alterar_senha BOOLEAN DEFAULT FALSE
);

CREATE TABLE confirmacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email_consumidor VARCHAR(150) NOT NULL,
    code VARCHAR(6) NOT NULL
);

CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    título VARCHAR(255) NOT NULL,
    preço VARCHAR(255) NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    loja VARCHAR(255) NOT NULL,
    usuario_id INT NOT NULL,
    receber_alerta BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_user FOREIGN KEY (usuario_id) REFERENCES consumidor(id_consumidor) ON DELETE CASCADE
);
'''