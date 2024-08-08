from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import mysql.connector

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app)

# Configuração do login 
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Configuração do MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="bdnavigate"
)

# Define a classe User que representa um usuário no sistema
class User(UserMixin):
    def __init__(self, id, email, password):
        self.id = id 
        self.email = email 
        self.password = password 

# Função que carrega um usuário a partir de um ID
@login_manager.user_loader
def load_user(user_id):
    cursor = db.cursor(dictionary=True)  # Cria um cursor para executar comandos SQL
    cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))  
    user = cursor.fetchone() 
    if user:
        # Se um usuário for encontrado, cria e retorna uma instância da classe User com os dados do usuário
        return User(user['id'], user['email'], user['password'])
    return None

# Rota para o endpoint de login
@app.route('/login', methods=['POST'])
def login():
    data = request.json 
    email = data.get('email')  
    password = data.get('password')  
    
    cursor = db.cursor(dictionary=True)  # Cria um cursor para executar comandos SQL
    
    # Verificação se o usuário existe
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    
    if user:
        # Verificação se a senha está correta
        if user['password'] == password:
            user_obj = User(user['id'], user['email'], user['password'])
            login_user(user_obj)
            return jsonify({"message": "Login bem sucedido"}), 200
        else:
            return jsonify({"message": "Senha incorreta"}), 401
    else:
        return jsonify({"message": "Cadastro não existente"}), 404

#logout para tela de perfil
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout feito com sucesso"}), 200

@app.route('/protected')
@login_required
def protected():
    return jsonify({"message": f"Olá, {current_user.email}"}), 200

if __name__ == '__main__':
    app.run(debug=True)
