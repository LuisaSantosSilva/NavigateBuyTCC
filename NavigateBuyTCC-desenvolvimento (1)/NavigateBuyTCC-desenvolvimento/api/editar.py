from flask import Flask, request, jsonify
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import mysql.connector

app = Flask(__name__)
app.secret_key = 'NavigateBuy'

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
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    user = cursor.fetchone()
    if user:
        return User(user['id'], user['email'], user['password'])
    return None

def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.after_request
def after_request(response):
    return add_cors_headers(response)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    
    if user:
        if user['password'] == password:
            user_obj = User(user['id'], user['email'], user['password'])
            login_user(user_obj)
            return jsonify({"message": "Login bem sucedido"}), 200
        else:
            return jsonify({"message": "Senha incorreta"}), 401
    else:
        return jsonify({"message": "Cadastro não existente"}), 404

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout feito com sucesso"}), 200

@app.route('/edit_profile', methods=['POST'])
@login_required
def edit_profile():
    data = request.json
    new_email = data.get('email')
    new_password = data.get('password')

    if not new_email or not new_password:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    cursor = db.cursor()

    try:
        cursor.execute("UPDATE users SET email=%s, password=%s WHERE id=%s", 
                       (new_email, new_password, current_user.id))
        db.commit()
        return jsonify({"message": "Perfil atualizado com sucesso"}), 200
    except mysql.connector.Error as err:
        db.rollback()  # Rollback em caso de erro
        return jsonify({"message": f"Erro ao atualizar perfil: {err}"}), 500
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)