from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

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
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    return response


# Define a rota para o endpoint de registro de usuários
@app.route('/api/app', methods=['POST'])
def register_user():
    try:
        # Obtém os dados JSON da solicitação
        data = request.get_json()
        username = data.get('username')  
        email = data.get('email')  
        password = data.get('password')

        # Verifica se todos os campos foram preenchidos
        if not username or not email or not password:
            return jsonify({"message": "Todos os campos são obrigatórios!"}), 400

        # Conexão com o banco de dados
        connection = get_db_connection()
        if connection is None:
            return jsonify({"message": "Erro ao conectar ao banco de dados"}), 500

        # Cria um cursor para executar comandos SQL
        cursor = connection.cursor()
        query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (username, email, password))
        connection.commit()
        return jsonify({"message": "Registro feito com sucesso!"}), 201
    except Error as e:
        print(f"Erro ao executar consulta: {e}")
        return jsonify({"message": "Erro ao se registrar", "Tente novamente": str(e)}), 500

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals() and connection.is_connected():
            connection.close()

if __name__ == '__main__':
    app.run(port=5000, debug=True)
