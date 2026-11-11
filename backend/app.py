from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

app = Flask(__name__)
CORS(app)

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

# ==================== 1. CATEGORIAS E PRODUTOS ====================
@app.route("/api/categorias", methods=["GET"])
def listar_categorias():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM Categoria;")
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route("/api/produtos", methods=["GET"])
def listar_produtos():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            sql = """
                SELECT p.*, c.nome_categoria 
                FROM Produto p
                LEFT JOIN Categoria c ON p.codigo_categoria = c.codigo_categoria;
            """
            cursor.execute(sql)
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/produtos', methods=['POST'])
def cadastrar_produto():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = """
            INSERT INTO Produto 
            (nome_produto, marca, preco_venda, quantd_estoque, codigo_barras, codigo_categoria, estoque_minino, peso_produto) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            dados.get('nome_produto'), dados.get('marca'), dados.get('preco_venda'), 
            dados.get('quantd_estoque'), dados.get('codigo_barras'), dados.get('codigo_categoria'), 
            dados.get('estoque_minimo'), dados.get('peso_produto')
        ))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Produto cadastrado com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

# ==================== 2. FORNECEDORES E ENTRADAS ====================
@app.route("/api/fornecedores", methods=["GET"])
def listar_fornecedores():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM Fornecedor;")
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route("/api/entradas", methods=["GET"])
def listar_entradas():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            sql = """
                SELECT e.*, f.nome_fornecedor 
                FROM Entrada e
                LEFT JOIN Fornecedor f ON e.codigo_fornecedor = f.codigo_fornec;
            """
            cursor.execute(sql)
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/entradas', methods=['POST'])
def cadastrar_entrada():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = "INSERT INTO Entrada (data_entrada, codigo_fornecedor) VALUES (%s, %s)"
        cursor.execute(sql, (dados.get('data_entrada'), dados.get('codigo_fornecedor')))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Entrada registrada com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route("/api/itens_entrada", methods=["GET"])
def listar_itens_entrada():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            sql = """
                SELECT ie.*, p.nome_produto 
                FROM Item_Entrada ie
                LEFT JOIN Produto p ON ie.cod_produto = p.codigo_produto;
            """
            cursor.execute(sql)
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/itens_entrada', methods=['POST'])
def cadastrar_item_entrada():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = """
            INSERT INTO Item_Entrada (cod_entrada, cod_produto, quantd_recebida, preco_compra) 
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (
            dados.get('cod_entrada'), dados.get('cod_produto'), 
            dados.get('quantd_recebida'), dados.get('preco_compra')
        ))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Item de entrada registrado com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

# ==================== 3. LOTES E VALIDADE ====================
@app.route("/api/lotes", methods=["GET"])
def listar_lotes():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            sql = """
                SELECT l.*, p.nome_produto 
                FROM Lote l
                LEFT JOIN Produto p ON l.codigo_produto = p.codigo_produto;
            """
            cursor.execute(sql)
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/lotes', methods=['POST'])
def cadastrar_lote():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = """
            INSERT INTO Lote (numero_lote, data_validade, quantidade_lote, codigo_entrada, codigo_produto)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            dados.get('numero_lote'), dados.get('data_validade'), 
            dados.get('quantidade_lote'), dados.get('codigo_entrada'), dados.get('codigo_produto')
        ))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Lote cadastrado com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

# ==================== 4. SAÍDAS DE ESTOQUE ====================
@app.route("/api/saidas", methods=["GET"])
def listar_saidas():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            sql = """
                SELECT s.*, c.nome as nome_cliente 
                FROM Saída s
                LEFT JOIN Cliente c ON s.código_cliente = c.codigo_cliente;
            """
            cursor.execute(sql)
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/saidas', methods=['POST'])
def cadastrar_saida():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = "INSERT INTO Saída (data_saida, código_cliente) VALUES (%s, %s)"
        cursor.execute(sql, (dados.get('data_saida'), dados.get('codigo_cliente')))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Saída registrada com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route("/api/itens_saida", methods=["GET"])
def listar_itens_saida():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            sql = """
                SELECT isai.*, l.numero_lote 
                FROM Item_Saída isai
                LEFT JOIN Lote l ON isai.codigo_lote = l.codigo_lote;
            """
            cursor.execute(sql)
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/itens_saida', methods=['POST'])
def cadastrar_item_saida():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = """
            INSERT INTO Item_Saída (codigo_saida, quantidade_saida, preco_saida, codigo_lote) 
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (
            dados.get('codigo_saida'), dados.get('quantidade_saida'), 
            dados.get('preco_saida'), dados.get('codigo_lote')
        ))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Item de saída registrado com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

# ==================== 5. CLIENTES, DÍVIDAS E PAGAMENTOS ====================
@app.route("/api/clientes", methods=["GET"])
def listar_clientes():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM Cliente;")
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/clientes', methods=['POST'])
def cadastrar_cliente():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = "INSERT INTO Cliente (nome, contato) VALUES (%s, %s)"
        cursor.execute(sql, (dados.get('nome'), dados.get('contato')))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Cliente cadastrado com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route("/api/dividas", methods=["GET"])
def listar_dividas():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            sql = """
                SELECT d.*, c.nome as nome_cliente 
                FROM Divida d
                LEFT JOIN Saída s ON d.cod_saida = s.codigo_saida
                LEFT JOIN Cliente c ON s.código_cliente = c.codigo_cliente;
            """
            cursor.execute(sql)
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/dividas', methods=['POST'])
def cadastrar_divida():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = """
            INSERT INTO Divida (cod_saida, valor_divida, data_divida, data_vencimento, situacao) 
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            dados.get('cod_saida'), dados.get('valor_divida'), 
            dados.get('data_divida'), dados.get('data_vencimento'), dados.get('situacao')
        ))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Dívida registrada com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route("/api/pagamentos", methods=["GET"])
def listar_pagamentos():
    try:
        conexao = conectar_banco()
        with conexao.cursor() as cursor:
            cursor.execute("SELECT * FROM Pagamento;")
            dados = cursor.fetchall()
        conexao.close()
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/pagamentos', methods=['POST'])
def cadastrar_pagamento():
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = """
            INSERT INTO Pagamento (cod_divida, data_pagamento, valor_pago, forma_pagamento) 
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (
            dados.get('cod_divida'), dados.get('data_pagamento'), 
            dados.get('valor_pago'), dados.get('forma_pagamento')
        ))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Pagamento registrado com sucesso!'}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

@app.route('/api/pagamentos/<int:cod_pagamento>', methods=['PUT'])
def atualizar_pagamento(cod_pagamento):
    dados = request.get_json()
    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()
        sql = """
            UPDATE Pagamento 
            SET cod_divida = %s, data_pagamento = %s, valor_pago = %s, forma_pagamento = %s 
            WHERE cod_pagamento = %s
        """
        cursor.execute(sql, (
            dados.get('cod_divida'), dados.get('data_pagamento'), 
            dados.get('valor_pago'), dados.get('forma_pagamento'), cod_pagamento
        ))
        conexao.commit()
        cursor.close()
        conexao.close()
        return jsonify({'mensagem': 'Pagamento atualizado com sucesso!'}), 200
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

if __name__ == "__main__":
    porta = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=porta)
