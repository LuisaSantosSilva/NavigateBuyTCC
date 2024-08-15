from flask import Flask, request, jsonify
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
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    user = cursor.fetchone()
    if user:
        return User(user['id'], user['email'], user['password'])
    return None

# Rota para o endpoint de login
@app.route('/login', methods=['POST'])
def login():
    data = request.json 
    email = data.get('email')  
    password = data.get('password')  
    
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

# Rota para logout
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout feito com sucesso"}), 200

# Rota para editar o perfil do usuário
@app.route('/editar-perfil', methods=['POST'])
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
    app.run(debug=True)
