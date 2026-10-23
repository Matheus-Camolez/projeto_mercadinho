from flask import Flask, jsonify
from flask_cors import CORS  # <--- Importar o CORS
import pymysql
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

app = Flask(__name__)
CORS(app)  # <--- Ativar o CORS para toda a aplicação

def conectar_banco():
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route("/", methods=["GET"])
def home():
    return jsonify({"mensagem": "API do Sistema de Controle de Estoque rodando com sucesso!"})

@app.route("/api/produtos", methods=["GET"])
def listar_produtos():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM Produto;")
            produtos = cursor.fetchall()
        conexao.close()
        return jsonify(produtos), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    porta = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=porta)
