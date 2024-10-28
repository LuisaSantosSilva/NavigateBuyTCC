from flask import Blueprint, current_app, jsonify, request, session
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from itsdangerous import URLSafeTimedSerializer
from models import User, CodigoDeConfirmacao, Produtos, db
import random
import smtplib

# Definindo um blueprint para agrupar as rotas
api = Blueprint('api', __name__)

# Rota para cadastro do usuário e enviar o código de confirmação
@api.route('/cadastrar', methods=['POST'])
def cadastrar():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password') 

    if User.query.filter_by(email=email).first():
        return jsonify({"E-mail já cadastrado."}), 400
    
    if not username or not email or not password:
                return jsonify({"Todos os campos são obrigatórios!"}), 400
            
    if len(password) < 8:
        return jsonify({"A senha deve ter pelo menos 8 caracteres."}), 400
        
    session['username'] = username
    session['email'] = email
    session['password'] = password

    code = f'{random.randint(100000, 999999):06d}'
    
    existing_code = CodigoDeConfirmacao.query.filter_by(email=email).first()

    if existing_code:
        existing_code.code = code
    else:
        new_code = CodigoDeConfirmacao(email=email, code=code)
        db.session.add(new_code)
        db.session.commit()

        # Enviar o código por e-mail
        corpo_email = f"""
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
            <!-- Cabeçalho -->
            <div style="background: linear-gradient(to right, #0c0440, #0C8249); padding: 20px; text-align: center; color: #FFFFFF;">
                <h2 style="margin: 0;">Código de Confirmação</h2><hr style="width: 50%; color: #FFFFFF;">
            </div>
            <div style="background-color: #F5F5F5;">
                <!-- Mensagem de boas-vindas -->
                <div style="padding: 20px; text-align: center;">
                    <h3 style="color: #000000;">Seja Bem Vindo(a) ao <span style="color: #0C0440;">Navigate <span style="color: #0C8249;">Buy</span> </span></h3>
                </div>
                
                <hr style="width:100%; height:3px; border-width:0; background-color:#000000;">
                
                <!-- Corpo do e-mail -->
                <div style="padding: 20px; text-align: left;">
                    <p style="font-size: 18px; font-weight: bold; color: #000000;">
                        Olá, ficamos felizes de termos você conosco,
                    </p>
                    <p style="font-size: 16px; color: #000000;">
                        Aqui você pode comparar preços, analisar avaliações de outros consumidores e encontrar as melhores ofertas em lojas populares com boa reputação.
                    </p>
                    <p style="font-size: 12px; color: #000000;">
                        Ao utilizar nosso sistema, você concorda com nossos termos de uso. Não se esqueça de lê-los.
                    </p>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <!-- Código de confirmação -->
                <div style="padding: 20px; text-align: center;">
                    <h3 style="color: #000000;">Seu código de confirmação é: <strong style="color: #0C8249;">{code}</strong></h3>
                    <p style="font-size: 18px; color: #000000;">Use este código para confirmar seu email.</p>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <!-- Rodapé -->
                <div style="padding: 18px; text-align: center;">
                    <p style="font-size: 14px; font-weight: bold; color: #000000;">Navegue com simplicidade e pesquise com mais segurança!</p>
                    <div style="padding: 10px; text-align: left;">
                        <p style="font-size: 14px; color: #000000;">Atenciosamente,<br>Equipe Navigate Buy</p>
                    </div>
                </div>
                
                <!-- Direitos reservados -->
                <div style="background: #000000; padding: 20px; text-align: center; color: #FFFFFF;">
                    <hr style="width:75%; height:3px; border-width:0; background: linear-gradient(to right, #0c0440, #0C8249);">
                    <p style="font-size: 12px; margin: 0;">Todos os direitos reservados a Navigate Buy © 2024</p><br>
                    <p style="font-size: 12px; margin: 0;">Trabalho de Conclusão de Curso</p>
                </div>
            </div>    
        </div>
            """
        enviar_email(email, "Código de Confirmação - Navigate Buy", corpo_email)
    return jsonify({"message": "Código de confirmação enviado para o seu e-mail."}), 200

# Rota para confirmar o código
@api.route('/confirmar_codigo', methods=['POST'])
def confirm_code():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    username = data.get('username')
    password = data.get('password')

    if not code:
        return jsonify({"error": "O código é necessário!."}), 400

    confirmation = CodigoDeConfirmacao.query.filter_by(code=code).first()

    if confirmation:
        username = session.get('username')
        email = session.get('email')
        password = session.get('password')

        if not username or not email or not password:
            return jsonify({"error": "Dados de usuário não encontrados."}), 400

        user = User(username=username, email=email)
        user.set_password(password) 

        db.session.add(user)
        db.session.delete(confirmation)
        db.session.commit()

        session.pop('username', None)
        session.pop('email', None)
        session.pop('password', None)

        return jsonify({"message": "Usuário cadastrado com sucesso!."}), 200
    else:
        return jsonify({"error": "Código de confirmação inválido."}), 400

# Rota para o usuário acessar com sua conta
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        if user.check_password(password):
            session['user_id'] = user.id
            db.session.commit()
            return jsonify({'message': 'Login realizado com sucesso!'}), 200
        else:
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

# Rota para o usuário enviar o email que irá alterar sua senha
@api.route('/solicitar-email', methods=['POST'])
def request_password_reset():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Dados de entrada inválidos."}), 400

    user = User.query.filter_by(email=email).first()

    if user:

        if user.password_reset_requested:
            return jsonify({"error": "Uma solicitação de redefinição de senha já foi feita."}), 400

        # Criação do serializer com a chave secreta da aplicação
        serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

        # Gerando o token para o e-mail do usuário
        token = serializer.dumps(email, salt='password-reset-salt')

        link_redefinicao = f"http://localhost:3000/cadastro_login/login/redefinirSenha?token={token}&email={email}"
        corpo_email = f"""
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
            <!-- Cabeçalho -->
            <div style="background: linear-gradient(to right, #0c0440, #0C8249); padding: 20px; text-align: center; color: #FFFFFF;">
                <h2 style="margin: 0;">Redefinição de Senha</h2><hr style="width: 50%; color: #FFFFFF;">
            </div>

            <div style="background-color: #F5F5F5;">
                <!-- Mensagem de boas-vindas -->
                <div style="padding: 20px; text-align: center;">
                    <h3 style="color: #000000;">Seja Bem Vindo(a) ao <span style="color: #0C0440;">Navigate <span style="color: #0C8249;">Buy</span> </span></h3>
                </div>
                
                <hr style="width:100%; height:3px; border-width:0; background-color:#000000;">
                
                <!-- Corpo do e-mail -->
                <div style="padding: 20px; text-align: left;">
                    <p style="font-size: 18px; font-weight: bold; color: #000000;">
                        Olá, ficamos felizes de termos você conosco,
                    </p>
                    <p style="font-size: 16px; color: #000000;">
                        Aqui você pode comparar preços, analisar avaliações de outros consumidores e encontrar as melhores ofertas em lojas populares com boa reputação.
                    </p>
                    <p style="font-size: 12px; color: #000000;">
                        Ao utilizar nosso sistema, você concorda com nossos termos de uso. Não se esqueça de lê-los.
                    </p>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <!-- Botão de Redefinição -->
                <div style="padding: 20px; text-align: center;">
                    <h3 style="color: #000000;">Clique no botão abaixo para redefinir sua senha:</h3>
                    <a href="{link_redefinicao}" style="padding: 10px 20px; background-color: #0C8249; color: #FFFFFF; border-radius: 5px;">Redefinir Senha</a>
                    <p style="font-size: 18px; color: #000000;">Use este link para redefinir sua senha.</p>
                    <p style="font-size: 18px; color: #000000;">Se você não solicitou a redefinição de senha, por favor, ignore este email.</p>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <!-- Rodapé -->
                <div style="padding: 18px; text-align: center;">
                    <p style="font-size: 14px; font-weight: bold; color: #000000;">Navegue com simplicidade e pesquise com mais segurança!</p>
                    <div style="padding: 10px; text-align: left;">
                        <p style="font-size: 14px; color: #000000;">Atenciosamente,<br>Equipe Navigate Buy</p>
                    </div>
                </div>
                
                <!-- Direitos reservados -->
                <div style="background: #000000; padding: 20px; text-align: center; color: #FFFFFF;">
                    <hr style="width:75%; height:3px; border-width:0; background: linear-gradient(to right, #0c0440, #0C8249);">
                    <p style="font-size: 12px; margin: 0;">Todos os direitos reservados a Navigate Buy © 2024</p><br>
                    <p style="font-size: 12px; margin: 0;">Trabalho de Conclusão de Curso</p>
                </div>
            </div>    
        </div>    
        """

        enviar_email(email, "Redefinição de Senha - Navigate Buy", corpo_email)
        user.password_reset_requested = True
        db.session.commit()
        return jsonify({"message": "Email de redefinição de senha enviado."}), 200
    else:
        return jsonify({"error": "Email não encontrado."}), 400
    
# Rota para redefinir a senha
@api.route('/mudar-senha', methods=['POST'])
def alterar_senha():
    data = request.get_json()
    email = data.get('email')
    nova_senha = data.get('password')

    if not email or not nova_senha:
        return jsonify({"error": "Dados de entrada inválidos."}), 400
    
    if len(nova_senha) < 8:
        return jsonify({"A senha deve ter pelo menos 8 caracteres."}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Email não encontrado."}), 400
    
    if not user.password_reset_requested:
        return jsonify({"Token de alteração inválido."}), 400

    user.set_password(nova_senha)
    user.password_reset_requested = False
    db.session.commit()

    return jsonify({"message": "Senha alterada com sucesso."}), 200

# Rota para favoritar produtos
@api.route('/favoritar_produto', methods=['POST'])
def favoritar():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Usuário não autenticado.'}), 401

    data = request.json

    def normalizar_dado(dado: str) -> str:
        return dado.strip().lower()

    produto_existente = Produtos.query.filter(
        Produtos.título == normalizar_dado(data['título']),
        Produtos.preço == data['preço'],
        Produtos.link == normalizar_dado(data['link']),
        Produtos.user_id == user_id
    ).first()

    if produto_existente:
        return jsonify({'error': 'Produto já foi favoritado.'}), 400

    produto = Produtos(
        título=data['título'],
        preço=data['preço'],
        imagem=data['imagem'],
        link=data['link'],
        loja=data['loja'],
        user_id=user_id
    )

    db.session.add(produto)
    db.session.commit()

    return jsonify({'message': 'Produto favoritado com sucesso!', 'id': produto.id}), 200

# Rota para o usuário escolher quais produtos ele deseja receber alerta
@api.route('/atualizar_alerta_produto', methods=['POST'])
def atualizar_alerta_produto():
    user_id = session.get("user_id")
    data = request.get_json()
    produto_id = data.get("produto_id")
    receber_alerta = data.get("receber_alerta")

    if not user_id:
        return jsonify({"error": "Usuário não autenticado."}), 401
    
    if receber_alerta is None:
        return jsonify({"error": "Dados incompletos."}), 400

    produto = Produtos.query.filter_by(id=produto_id, user_id=user_id).first()

    if not produto:
        return jsonify({"error": "Produto não encontrado ou não pertence ao usuário."}), 404

    produto.receber_alerta = receber_alerta
    db.session.commit()

    return jsonify({"message": "Preferência de alerta atualizada com sucesso."}), 200

# Função para enviar alertas de produtos favoritados
def enviar_alerta_favoritos():
    from app import app
    with app.app_context():
        usuarios = User.query.all()

        for user in usuarios:
            favoritos = Produtos.query.filter_by(user_id=user.id, receber_alerta=True).all()
            email = user.email

            if favoritos:
            
                produtos_lista = ''.join(
                    f"""
                    <tr style="background-color: #F9F9F9; border-bottom: 1px solid #DDDDDD;">
                        <td style="padding: 10px; text-align: center;">
                            <img src="{produto.imagem}" alt="{produto.título}" style="width: 60px; height: auto; border-radius: 5px;">
                        </td>
                        <td style="padding: 10px;">{produto.título}</td>
                        <td style="padding: 10px; text-align: right; font-weight: bold; color: #0C0440;">R$ {produto.preço}</td>
                    </tr>
                    """ for produto in favoritos
                )

                corpo_email = f"""
                    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
                        <!-- Cabeçalho -->
                        <div style="background: linear-gradient(to right, #0c0440, #0C8249); padding: 20px; text-align: center; color: #FFFFFF;">
                            <h2 style="margin: 0;">Alertas de Produtos Favoritados</h2><hr style="width: 50%; color: #FFFFFF;">
                        </div>

                        <div style="background-color: #F5F5F5;">
                            <!-- Mensagem principal -->
                            <div style="padding: 20px; text-align: center;">
                                <h3 style="color: #000000;">Novidades sobre seus produtos favoritos no <span style="color: #0C0440;">Navigate <span style="color: #0C8249;">Buy</span></span></h3>
                            </div>
                            
                            <hr style="width:100%; height:3px; border-width:0; background-color:#000000;">

                            <!-- Corpo do e-mail -->
                            <div style="padding: 20px; text-align: left;">
                                <p style="font-size: 18px; font-weight: bold; color: #000000;">
                                    Olá, {user.username}!
                                </p>
                                <p style="font-size: 16px; color: #000000;">
                                    Aqui estão as últimas atualizações sobre seus produtos favoritos. Não perca as melhores ofertas disponíveis este mês!
                                </p>
                                <!-- Tabela de produtos -->
                                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                    <thead>
                                        <tr style="background-color: #0C8249; color: #FFFFFF; text-align: left;">
                                            <th style="padding: 10px; width: 80px;">Imagem</th>
                                            <th style="padding: 10px;">Título</th>
                                            <th style="padding: 10px; text-align: right;">Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtos_lista}
                                    </tbody>
                                </table>
                            </div>

                            <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                            <!-- Botão de ver favoritos -->
                            <div style="padding: 20px; text-align: center;">
                                <a href="http://localhost:3000/perfil/favoritos" style="padding: 10px 20px; background-color: #0C8249; color: #FFFFFF; border-radius: 5px;">Ver Produtos Favoritos</a>
                            </div>

                            <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                            <!-- Rodapé -->
                            <div style="padding: 18px; text-align: center;">
                                <p style="font-size: 14px; font-weight: bold; color: #000000;">Navegue com simplicidade e pesquise com mais segurança!</p>
                                <div style="padding: 10px; text-align: left;">
                                    <p style="font-size: 14px; color: #000000;">Atenciosamente,<br>Equipe Navigate Buy</p>
                                </div>
                            </div>
                            
                            <!-- Direitos reservados -->
                            <div style="background: #000000; padding: 20px; text-align: center; color: #FFFFFF;">
                                <hr style="width:75%; height:3px; border-width:0; background: linear-gradient(to right, #0c0440, #0C8249);">
                                <p style="font-size: 12px; margin: 0;">Todos os direitos reservados a Navigate Buy © 2024</p><br>
                                <p style="font-size: 12px; margin: 0;">Trabalho de Conclusão de Curso</p>
                            </div>
                        </div>    
                    </div>    
                    """
                enviar_email(email, "Alerta - Navigate Buy", corpo_email)
    return jsonify({"message": "Alerta de favoritos enviado por e-mail."}), 200

# Rota para exibir produtos favoritados
@api.route('/produtos_favoritos', methods=['GET'])
def produtos_favoritos():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({'error': 'Usuário não autenticado.'}), 401
    
    produtos_favoritos = Produtos.query.filter_by(user_id=user_id).all()

    favoritos = [{
        "id": favorito.id,
        "titulo": favorito.título,
        "preco": favorito.preço,
        "imagem": favorito.imagem,
        "link": favorito.link,
        "loja": favorito.loja,
        "receber_alerta": favorito.receber_alerta
        }
            for favorito in produtos_favoritos
    ]
    return jsonify(favoritos), 200

# Rota para remover produtos favoritos
@api.route('/desfavoritar_produto', methods=['DELETE'])
def desfavoritar_produto():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Usuário não autenticado.'}), 401
    
    data = request.json
    produto_id = data.get('produto_id')

    produto = Produtos.query.filter_by(id=produto_id, user_id=user_id).first()

    if not produto:
        return jsonify({'message': 'Produto não encontrado ou não favoritado.'}), 404

    db.session.delete(produto)
    db.session.commit()

    return jsonify({'message': 'Produto desfavoritado com sucesso!'}), 200