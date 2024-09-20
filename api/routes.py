from flask import Blueprint, jsonify, request, session
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from itsdangerous import URLSafeTimedSerializer
from models import User, ConfirmationCode, db
from datetime import datetime, timedelta
import random
import smtplib

# Definindo um blueprint para agrupar as rotas
api = Blueprint('api', __name__)

# Rota para cadastro do usuário
@api.route('/useradd', methods=['POST'])
def cadastrar():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password') 

    if not username or not email or not password:
            return jsonify({"message": "Todos os campos são obrigatórios!"}), 400
        
    if len(password) < 8:
        return jsonify({"message": "A senha deve ter pelo menos 8 caracteres."}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "E-mail já cadastrado."}), 400
    
    user = User(username=username, email=email, failed_attempts=0, last_attempt=datetime.now())
    user.set_password(password) 

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

# Rota para o usuário acessar com sua conta
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        if user.failed_attempts >= 5 and user.last_attempt > datetime.now() - timedelta(minutes=15):
            return jsonify({'error': 'Muitas tentativas falhas. Tente novamente mais tarde.'}), 429

        if user.check_password(password):
            session['user_id'] = user.id
            user.failed_attempts = 0
            db.session.commit()
            return jsonify({'message': 'Login realizado com sucesso!'}), 200
        else:
            user.failed_attempts += 1
            user.last_attempt = datetime.now()
            db.session.commit()
            return jsonify({'error': 'Email ou senha incorretos.'}), 401

# Rota para o sistema obter os dados do usuário que estiver na sessão
@api.route('/perfil', methods=['GET'])
def get_perfil():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({'error': 'Usuário não autenticado.'}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
            'username': user.username,
            'email': user.email
        }), 200

# Rota para o usuário editar suas informações
@api.route('/editar-perfil', methods=['PUT'])
def editar_perfil():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({'error': 'Usuário não autenticado.'}), 401

    user = User.query.filter_by(id=user_id).first()

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username:
        user.username = username
    if password:
        user.set_password(password)

    user = User.query.filter_by(username=username, password=password)

    db.session.commit()
    return jsonify({'message': 'Perfil atualizado com sucesso!'}), 200

# Rota para o usuário sair de sua conta
@api.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout realizado com sucesso!'}), 200

# Função para enviar o email
def enviar_email(destinatario, assunto, corpo):
    remetente = "navigatebuy@gmail.com"
    senha = "b q x w a x w u b z k h s t s d" 

    msg = MIMEMultipart()
    msg['From'] = remetente
    msg['To'] = destinatario
    msg['Subject'] = assunto
    
    corpo_email = MIMEText(corpo.encode('utf-8'), 'html', 'utf-8')
    msg.attach(corpo_email)

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(remetente, senha)
            server.sendmail(remetente, destinatario, msg.as_string())
        print("E-mail enviado com sucesso.")
    except Exception as e:
        print(f"Erro ao enviar email: {e}")

# Rota para o usuário resetar sua senha
@api.route('/request-password-reset', methods=['OPTIONS', 'POST'])
def request_password_reset():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({"error": "Dados de entrada inválidos."}), 400

    email = data['email']
    user = User.query.filter_by(email=email).first()

    if user:
        # Criação do serializer com a chave secreta da aplicação
        serializer = URLSafeTimedSerializer(api.config['SECRET_KEY'])

        # Gerando o token para o e-mail do usuário
        token = serializer.dumps(email, salt='password-reset-salt')

        link_redefinicao = f"http://localhost:3000/redefinir_senha?email={token}"
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
@api.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('password')
    token = data.get('token')

    if not email or not new_password:
        return jsonify({"error": "Dados insuficientes."}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        serializer = URLSafeTimedSerializer(api.config['SECRET_KEY'])

        try:
            email_from_token = serializer.loads(token, salt='password-reset-salt', max_age=3600)
        except Exception:
            return jsonify({"error": "Token inválido ou expirado."}), 400
        if email_from_token != email:
            return jsonify({"error": "Email do token não corresponde ao email fornecido."}), 400
        
        user.set_password(new_password)
        db.session.commit()
        return jsonify({"message": "Senha redefinida com sucesso."}), 200
    else:
        return jsonify({"error": "Usuário não encontrado."}), 404        

# Rota para enviar o código de confirmação
@api.route('/send_code', methods=['OPTIONS', 'POST'])
def send_code():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"error": "E-mail é obrigatório."}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "E-mail não encontrado."}), 404
    # Gerar o código de confirmação
    code = f'{random.randint(100000, 999999):06d}'
    existing_code = ConfirmationCode.query.filter_by(email=email).first()
    if existing_code:
        existing_code.code = code
    else:
        new_code = ConfirmationCode(email=email, code=code)
        db.session.add(new_code)
    db.session.commit()
    # Enviar o código por e-mail
    corpo_email = f"""
    <h3>Código de Confirmação</h3>
    <p>Seu código de confirmação é: <strong>{code}</strong></p>
    <p>Use este código para confirmar o seu e-mail.</p>
    """
    enviar_email(email, "Código de Confirmação - Navigate Buy", corpo_email)
    return jsonify({"message": "Código de confirmação enviado para o seu e-mail."}), 200

# Rota para confirmar o código
@api.route('/confirm_code', methods=['POST'])
def confirm_code():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')

    if not email or not code:
        return jsonify({"error": "Dados insuficientes."}), 400

    confirmation = ConfirmationCode.query.filter_by(email=email, code=code).first()

    if confirmation:
        # Remover o código após confirmação bem-sucedida
        db.session.delete(confirmation)
        db.session.commit()
        return jsonify({"message": "Código confirmado com sucesso."}), 200
    else:
        return jsonify({"error": "Código de confirmação inválido."}), 400