from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
app.secret_key = 'f3280ebb-45ac-4acb-814d-9ca9ea60e1e8'

CORS(app, resources={r"/api/*": {"origins": "*"}})


# Configurações do banco de dados
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'bdnavigate'
}

# Conexão do banco de dados
def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None

# Configuração do CORS para evitar erros
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    return response

# Configuração do login 
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Define a classe User que representa um usuário no sistema
class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id 
        self.username = username 
        self.password = password 

# Função que carrega um usuário a partir de um ID
@login_manager.user_loader
def load_user(user_id):
    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500
    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE id=%s"
        cursor.execute(query, (user_id,))  
        user = cursor.fetchone() 
        if user:
            return User(user['id'], user['username'], user['password'])
        return None
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Define a rota para o endpoint de registro de usuários
@app.route('/useradd', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        username = data.get('username')  
        email = data.get('email')  
        password = data.get('password')

        if not username or not email or not password:
            return jsonify({"message": "Todos os campos são obrigatórios!"}), 400
        
        if len(password) < 8:
            return jsonify({"message": "A senha deve ter pelo menos 8 caracteres."}), 400
        

        connection = get_db_connection()
        if connection is None:
            return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

        cursor = connection.cursor()
        query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (username, email, password))
        connection.commit()
        return jsonify({"message": "Registro feito com sucesso!"}), 201
    except Error as e:
        print(f"Erro ao executar consulta: {e}")
        return jsonify({"message": "Erro ao se registrar", "Tente novamente": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Rota para o endpoint de login
@app.route('/login', methods=['POST'])
def login():
    data = request.json 
    username = data.get('username')  
    password = data.get('password')  
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500
    
    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT id, username, password FROM users WHERE username=%s"
        cursor.execute(query, (username,))  
        user = cursor.fetchone()
        
        if user:
            user_id, user_username, user_password = user['id'], user['username'], user['password']

            if user_password == password:
                user_obj = User(user_id, user_username, user_password)
                login_user(user_obj)
                return jsonify({"message": "Login bem sucedido"}), 200
            else:
                return jsonify({"message": "Senha incorreta"}), 401
        else:
            return jsonify({"message": "Cadastro não existente"}), 404
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

if __name__ == '__main__':
    app.run(port=5000, debug=True)
