from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import random
import smtplib
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
app.secret_key = 'f3280ebb-45ac-4acb-814d-9ca9ea60e1e8'
CORS(app)

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
        
        cursor = connection.cursor(dictionary=True)
        query = "SELECT email FROM users WHERE email=%s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        
        if user:
            user_email = user['email']

            if user_email == email:
                return jsonify({"message": "Email já cadastrado"}), 400
            
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
    email = data.get('email')  
    password = data.get('password')  
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500
    
    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT id, email, password FROM users WHERE email=%s"
        cursor.execute(query, (email,))  
        user = cursor.fetchone()
        
        if user:
            user_id, user_email, user_password = user['id'], user['email'], user['password']

            if user_password == password:
                user_obj = User(user_id, user_email, user_password)
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

@app.route('/logout', methods=['POST'])
def logout():
    data = request.json
    username = data.get('username')  
   
    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500
   
    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE username=%s"
        cursor.execute(query, (username,))  
        user = cursor.fetchone()
 
        user_id, user_username, user_password = user['id'], user['username'], user['password']
        user_obj = User(user_id, user_username, user_password)
        logout_user(user_obj)
        return jsonify({'message': 'Logout realizado com sucesso!'}), 200
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()            

# Rota para o endpoint editar-perfil
@app.route('/editar-perfil', methods=['PUT'])
def editar_perfil():

    data = request.get_json()
    id = data.get('id')
    username = data.get('username')
    password = data.get('password')

    if not id or not username or not password:
        return jsonify({"message": "Todos os campos são obrigatórios!"}), 400
        
    if len(password) < 8:
        return jsonify({"message": "A senha deve ter pelo menos 8 caracteres."}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "UPDATE users SET username=%s, password=%s WHERE id=%s"
        cursor.execute(query, (username, password, id))  
        
        connection.commit()
        return jsonify({"message": "Perfil atualizado com sucesso!"}), 201
    except Error as e:
        print(f"Erro ao executar consulta: {e}")
        return jsonify({"message": "Erro ao editar seu perfil", "Tente novamente": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Rota para o endpoint buscar dados do perfil
@app.route('/perfil', methods=['GET'])
def get_perfil():
    username = request.args.get('username')
    email = request.args.get('email')
    password = request.args.get('password')

    if not username and not email and not password:
        return jsonify({'error': 'Pelo menos um parâmetro é necessário.'}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE username=%s OR email=%s OR password=%s"
        cursor.execute(query, (username, email, password))
        user = cursor.fetchone()

        if user:
            return jsonify({
                'username': user['username'],
                'email': user['email']
            }), 200
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Error as e:
        print(f"Erro ao executar consulta: {e}")
        return jsonify({"message": "Erro ao inserir dados do seu perfil", "Tente novamente": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Função para enviar o email
def enviar_email(destinatario, assunto, corpo):
    remetente = "navigatebuy@gmail.com"
    senha = "b q x w a x w u b z k h s t s d" 

    msg = MIMEMultipart()
    msg['From'] = remetente
    msg['To'] = destinatario
    msg['Subject'] = assunto
    msg.attach(MIMEText(corpo, 'html'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(remetente, senha)
            server.sendmail(remetente, destinatario, msg.as_string())
        print("E-mail enviado com sucesso.")
    except Exception as e:
        print(f"Erro ao enviar email: {e}")

# Adiciona suporte para requisições OPTIONS
@app.route('/request-password-reset', methods=['OPTIONS', 'POST'])
def request_password_reset():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({"error": "Dados de entrada inválidos."}), 400

    email = data['email']
    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500
    
    cursor = connection.cursor(dictionary=True)
    user = cursor.fetchone()

    if user:
        link_redefinicao = f"http://localhost:3000/redefinir_senha?email={email}"
        corpo_email = f"""
        <h3>Redefinição de Senha</h3>
        <p>Clique no botão abaixo para redefinir sua senha:</p>
        <a href="{link_redefinicao}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
        <p>Se você não solicitou a redefinição de senha, por favor, ignore este email.</p>
        """

        enviar_email(email, "Redefinição de Senha - Navigate Buy", corpo_email)
        return jsonify({"message": "Email de redefinição de senha enviado."}), 200
    else:
        return jsonify({"error": "Email não encontrado."}), 404
    
# Endpoint para redefinir a senha
@app.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    id = data.get('id')
    email = data.get('email')
    new_password = data.get('password')

    if not email or not new_password:
        return jsonify({"error": "Dados insuficientes."}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = None
    try:
        cursor = connection.cursor(dictionary=True)
        query = "UPDATE users SET password=%s WHERE id=%s"
        cursor.execute(query, (new_password, id))  
    
        connection.commit()
        return jsonify({"message": "Senha redefinida com sucesso."}), 200
    except Error as e:
        print(f"Erro ao executar consulta: {e}")
        return jsonify({"message": "Erro ao requisitar nova senha", "Tente novamente": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Rota para enviar o código de confirmação
@app.route('/send_code', methods=['OPTIONS', 'POST'])
def send_code():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "E-mail é obrigatório."}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = None
    try:    
        cursor = connection.cursor(dictionary=True)
        query = "SELECT email FROM users WHERE email=%s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "E-mail não encontrado."}), 404
        
        # Gerar o código de confirmação
        code = str(random.randint(100000, 999999))
        query = "SELECT id, code FROM confirmations WHERE email=%s"
        cursor.execute(query, (email,))
        confirmation = cursor.fetchone()

        if confirmation:
            confirmation_id = confirmation['id'],            
            query = "UPDATE confirmations SET code=%s WHERE id=%s"
            cursor.execute(query, (code, confirmation_id[0])) 

        else:
            query = "INSERT INTO confirmations (email, code) VALUES (%s, %s)"
            cursor.execute(query, (email, code))
        connection.commit()

        # Enviar o código por e-mail
        corpo_email = f"""
        <h3>Código de Confirmação</h3>
        <p>Seu código de confirmação é: <strong>{code}</strong></p>
        <p>Use este código para confirmar o seu e-mail.</p>
        """
        enviar_email(email, "Código de Confirmação - Navigate Buy", corpo_email)
        return jsonify({"message": "Código de confirmação enviado para o seu e-mail."}), 200
    
    except Error as e:
        print(f"Erro ao executar consulta: {e}")
        return jsonify({"message": "Erro ao requisitar nova senha", "Tente novamente": str(e)}), 500

# Rota para confirmar o código
@app.route('/confirm_code', methods=['POST'])
def confirm_code():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')

    if not email or not code:
        return jsonify({"error": "Dados insuficientes."}), 400
    
        
    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

    cursor = None
    try:    
        cursor = connection.cursor(dictionary=True)
        query = "SELECT email, code FROM confirmations WHERE email=%s AND code=%s"
        cursor.execute(query, (email, code))
        confirmation = cursor.fetchone()

        if confirmation:
            # Remover o código após confirmação bem-sucedida
            query = "DELETE FROM confirmations WHERE email=%s AND code=%s"
            cursor.execute(query, (email, code))
            connection.commit()
            return jsonify({"message": "Código confirmado com sucesso."}), 200
        else:
            return jsonify({"error": "Código de confirmação inválido."}), 400    
    except Error as e:
        print(f"Erro ao executar consulta: {e}")
        return jsonify({"message": "Erro ao requisitar nova senha", "Tente novamente": str(e)}), 500            

if __name__ == '__main__':
    app.run(port=5000, debug=True)
