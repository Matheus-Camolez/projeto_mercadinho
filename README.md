========================================================================

🛒 SISTEMA DE CONTROLE DE ESTOQUE (MERCADINHO)

========================================================================



Autor: Matheus Augusto Camolez de Oliveira e Silmari Garcia

Repositório: https://github.com/Matheus-Camolez/projeto_mercadinho



------------------------------------------------------------------------

1. VISÃO GERAL DO PROJETO

------------------------------------------------------------------------

Projeto de um sistema full-stack de Controle de Estoque desenvolvido 

para gestão de produtos em pequeno comércio. A aplicação consome dados 

de um banco de dados relacional MySQL por meio de uma API REST em Flask 

e exibe os dados em uma interface web simples e funcional.



------------------------------------------------------------------------

2. TECNOLOGIAS UTILIZADAS

------------------------------------------------------------------------

• Backend: Python 3, Flask, Flask-CORS, PyMySQL, python-dotenv

• Frontend: HTML5, CSS3, JavaScript (ES6 / Vanilla JS)

• Banco de Dados: MySQL

• Versionamento: Git / GitHub



------------------------------------------------------------------------

3. ESTRUTURA DO REPOSITÓRIO

------------------------------------------------------------------------

projeto_mercadinho/

├── backend/

│   ├── app.py               # Servidor Flask e rotas da API

│   ├── requirements.txt     # Dependências Python do projeto

│   └── schema.sql           # Script SQL com a estrutura e dados iniciais

├── frontend/

│   ├── index.html           # Interface do usuário

│   ├── style.css            # Estilização visual (Palette #005088)

│   └── script.js            # Integração via Fetch API

├── .gitignore               # Arquivos ignorados pelo Git

└── README.txt               # Documentação do projeto



------------------------------------------------------------------------

4. COMO EXECUTAR O PROJETO (PASSO A PASSO)

------------------------------------------------------------------------



--- PASSO 1: CLONAR O REPOSITÓRIO ---

No terminal ou Prompt de Comando, execute:

    git clone https://github.com/Matheus-Camolez/projeto_mercadinho.git

    cd projeto_mercadinho





--- PASSO 2: CONFIGURAR O BANCO DE DADOS (MySQL) ---

1. Abra o MySQL Workbench ou a linha de comando do MySQL na sua máquina.

2. Importe e execute o arquivo de script SQL localizado em:

   backend/schema.sql

3. O script criará a base de dados `mydb` e a tabela `Produto` preenchida 

   com os registros de teste.





--- PASSO 3: CONFIGURAR AS VARIÁVEIS DE AMBIENTE (.env) ---

Crie um arquivo chamado `.env` na RAIZ do projeto contendo as credenciais 

do seu MySQL local:



    DB_HOST=localhost

    DB_USER=seu_usuario_mysql

    DB_PASSWORD=sua_senha_mysql

    DB_NAME=mydb

    PORT=5000





--- PASSO 4: CONFIGURAR E RODAR O BACKEND (FLASK) ---



[ Opção A: No LINUX (Linux Mint / Ubuntu / Debian) ]

1. Criar e ativar o ambiente virtual (venv):

    python3 -m venv venv

    source venv/bin/activate



2. Instalar as dependências:

    pip install -r backend/requirements.txt



3. Executar a API:

    python3 backend/app.py





[ Opção B: No WINDOWS (CMD ou PowerShell) ]

1. Criar e ativar o ambiente virtual (venv):

   • No Prompt de Comando (CMD):

     python -m venv venv

     venv\Scripts\activate.bat



   • No PowerShell:

     python -m venv venv

     .\venv\Scripts\Activate.ps1



2. Instalar as dependências:

    pip install -r backend/requirements.txt



3. Executar a API:

    python backend/app.py





A API estará disponível e rodando em: http://127.0.0.1:5000/api/produtos





--- PASSO 5: ACESSAR O FRONTEND ---

Com o servidor Flask em execução:

1. Navegue até a pasta `frontend/`.

2. Abra o arquivo `index.html` em qualquer navegador web (Chrome, Firefox, Edge).

3. Clique no botão "Carregar Produtos do Banco" para realizar a busca no banco de dados.

========================================================================
