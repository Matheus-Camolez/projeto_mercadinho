// Função para alternar entre as abas horizontais
function mudarAba(nomeAba) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`tab-${nomeAba}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias();
    carregarFornecedores();
    carregarProdutosSelect();
    carregarClientesSelect();
    carregarLotesSelect();
});

// --- CARREGAMENTO DE SELECTS ---
async function carregarCategorias() {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/categorias');
        const data = await res.json();
        const sel = document.getElementById('codigo_categoria');
        sel.innerHTML = '<option value="">Selecione a Categoria</option>';
        data.forEach(c => sel.innerHTML += `<option value="${c.codigo_categoria}">${c.nome_categoria}</option>`);
    } catch(e) { console.error(e); }
}

async function carregarFornecedores() {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/fornecedores');
        const data = await res.json();
        const sel = document.getElementById('codigo_fornecedor');
        sel.innerHTML = '<option value="">Selecione o Fornecedor</option>';
        data.forEach(f => sel.innerHTML += `<option value="${f.codigo_fornec}">${f.nome_fornecedor}</option>`);
    } catch(e) { console.error(e); }
}

async function carregarProdutosSelect() {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/produtos');
        const data = await res.json();
        const sel = document.getElementById('ie_cod_produto');
        sel.innerHTML = '<option value="">Selecione o Produto</option>';
        data.forEach(p => sel.innerHTML += `<option value="${p.codigo_produto}">${p.nome_produto}</option>`);
        
        const selLote = document.getElementById('lote_codigo_produto');
        if(selLote) {
            selLote.innerHTML = '<option value="">Selecione o Produto</option>';
            data.forEach(p => selLote.innerHTML += `<option value="${p.codigo_produto}">${p.nome_produto}</option>`);
        }
    } catch(e) { console.error(e); }
}

async function carregarClientesSelect() {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/clientes');
        const data = await res.json();
        const sel = document.getElementById('saida_codigo_cliente');
        sel.innerHTML = '<option value="">Selecione o Cliente (Opcional)</option>';
        data.forEach(c => sel.innerHTML += `<option value="${c.codigo_cliente}">${c.nome}</option>`);
    } catch(e) { console.error(e); }
}

async function carregarLotesSelect() {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/lotes');
        const data = await res.json();
        const sel = document.getElementById('is_codigo_lote');
        sel.innerHTML = '<option value="">Selecione o Lote</option>';
        data.forEach(l => sel.innerHTML += `<option value="${l.codigo_lote}">Lote: ${l.numero_lote} (Disp: ${l.quantidade_lote})</option>`);
    } catch(e) { console.error(e); }
}

// --- MÓDULO 1: PRODUTOS ---
document.getElementById('produto-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        nome_produto: document.getElementById('nome_produto').value,
        marca: document.getElementById('marca').value,
        codigo_barras: document.getElementById('codigo_barras').value,
        codigo_categoria: parseInt(document.getElementById('codigo_categoria').value),
        preco_venda: parseFloat(document.getElementById('preco_venda').value),
        quantd_estoque: parseInt(document.getElementById('quantd_estoque').value),
        estoque_minimo: parseInt(document.getElementById('estoque_minimo').value),
        peso_produto: document.getElementById('peso_produto').value
    };
    const res = await fetch('http://127.0.0.1:5000/api/produtos', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Produto cadastrado com sucesso!'); document.getElementById('produto-form').reset(); carregarProdutos(); carregarProdutosSelect(); }
});

async function carregarProdutos() {
    const res = await fetch('http://127.0.0.1:5000/api/produtos');
    const data = await res.json();
    document.querySelector('#tabela-produtos tbody').innerHTML = data.map(p => 
        `<tr><td>${p.codigo_produto}</td><td>${p.nome_produto}</td><td>${p.marca}</td><td>${p.nome_categoria || '-'}</td><td>R$ ${Number(p.preco_venda).toFixed(2)}</td><td>${p.quantd_estoque}</td><td>${p.estoque_minino}</td></tr>`
    ).join('');
}

// --- MÓDULO 2: ENTRADAS E ITENS ---
document.getElementById('entrada-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = { data_entrada: document.getElementById('data_entrada').value, codigo_fornecedor: parseInt(document.getElementById('codigo_fornecedor').value) };
    const res = await fetch('http://127.0.0.1:5000/api/entradas', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Cabeçalho de entrada registrado!'); carregarEntradas(); }
});

document.getElementById('item-entrada-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        cod_entrada: parseInt(document.getElementById('ie_cod_entrada').value),
        cod_produto: parseInt(document.getElementById('ie_cod_produto').value),
        quantd_recebida: parseFloat(document.getElementById('quantd_recebida').value),
        preco_compra: parseFloat(document.getElementById('preco_compra').value)
    };
    const res = await fetch('http://127.0.0.1:5000/api/itens_entrada', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Item de entrada registrado com histórico de preço!'); carregarItensEntrada(); }
});

async function carregarEntradas() {
    const res = await fetch('http://127.0.0.1:5000/api/entradas');
    const data = await res.json();
    document.querySelector('#tabela-entradas tbody').innerHTML = data.map(e => `<tr><td>${e.codigo_entrada}</td><td>${e.data_entrada}</td><td>${e.nome_fornecedor || '-'}</td></tr>`).join('');
}

async function carregarItensEntrada() {
    const res = await fetch('http://127.0.0.1:5000/api/itens_entrada');
    const data = await res.json();
    document.querySelector('#tabela-itens-entrada tbody').innerHTML = data.map(ie => `<tr><td>${ie.cod_entrada}</td><td>${ie.nome_produto || '-'}</td><td>${ie.quantd_recebida}</td><td>R$ ${Number(ie.preco_compra).toFixed(2)}</td></tr>`).join('');
}

// --- MÓDULO 3: LOTES ---
document.getElementById('lote-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        numero_lote: document.getElementById('numero_lote').value,
        data_validade: document.getElementById('data_validade').value,
        quantidade_lote: parseFloat(document.getElementById('quantidade_lote').value),
        codigo_entrada: parseInt(document.getElementById('lote_codigo_entrada').value),
        codigo_produto: parseInt(document.getElementById('lote_codigo_produto').value)
    };
    const res = await fetch('http://127.0.0.1:5000/api/lotes', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Lote registrado com sucesso!'); carregarLotes(); carregarLotesSelect(); }
});

async function carregarLotes() {
    const res = await fetch('http://127.0.0.1:5000/api/lotes');
    const data = await res.json();
    document.querySelector('#tabela-lotes tbody').innerHTML = data.map(l => `<tr><td>${l.numero_lote}</td><td>${l.nome_produto || '-'}</td><td>${l.data_validade}</td><td>${l.quantidade_lote}</td><td>${l.codigo_entrada}</td></tr>`).join('');
}

// --- MÓDULO 4: SAÍDAS E ITENS ---
document.getElementById('saida-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = { data_saida: document.getElementById('data_saida').value, código_cliente: parseInt(document.getElementById('saida_codigo_cliente').value) || null };
    const res = await fetch('http://127.0.0.1:5000/api/saidas', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Cabeçalho de saída registrado!'); carregarSaidas(); }
});

document.getElementById('item-saida-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        codigo_saida: parseInt(document.getElementById('is_codigo_saida').value),
        codigo_lote: parseInt(document.getElementById('is_codigo_lote').value),
        quantidade_saida: parseFloat(document.getElementById('quantidade_saida').value),
        preco_saida: parseFloat(document.getElementById('preco_saida').value)
    };
    const res = await fetch('http://127.0.0.1:5000/api/itens_saida', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Item de saída registrado com baixa por lote!'); carregarItensSaida(); }
});

async function carregarSaidas() {
    const res = await fetch('http://127.0.0.1:5000/api/saidas');
    const data = await res.json();
    document.querySelector('#tabela-saidas tbody').innerHTML = data.map(s => `<tr><td>${s.codigo_saida}</td><td>${s.data_saida}</td><td>${s.nome_cliente || 'Cliente Balcão'}</td></tr>`).join('');
}

async function carregarItensSaida() {
    const res = await fetch('http://127.0.0.1:5000/api/itens_saida');
    const data = await res.json();
    document.querySelector('#tabela-itens-saida tbody').innerHTML = data.map(is => `<tr><td>${is.codigo_saida}</td><td>Lote #${is.codigo_lote}</td><td>${is.quantidade_saida}</td><td>R$ ${Number(is.preco_saida).toFixed(2)}</td></tr>`).join('');
}

// --- MÓDULO 5: CLIENTES, DÍVIDAS E PAGAMENTOS ---
document.getElementById('cliente-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = { nome: document.getElementById('cliente_nome').value, contato: document.getElementById('cliente_contato').value };
    const res = await fetch('http://127.0.0.1:5000/api/clientes', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Cliente cadastrado!'); carregarClientes(); carregarClientesSelect(); }
});

async function carregarClientes() {
    const res = await fetch('http://127.0.0.1:5000/api/clientes');
    const data = await res.json();
    document.querySelector('#tabela-clientes tbody').innerHTML = data.map(c => `<tr><td>${c.codigo_cliente}</td><td>${c.nome}</td><td>${c.contato}</td></tr>`).join('');
}

document.getElementById('divida-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        cod_saida: parseInt(document.getElementById('divida_cod_saida').value),
        valor_divida: parseFloat(document.getElementById('valor_divida').value),
        data_divida: document.getElementById('data_divida').value,
        data_vencimento: document.getElementById('data_vencimento').value,
        situacao: document.getElementById('situacao_divida').value
    };
    const res = await fetch('http://127.0.0.1:5000/api/dividas', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { alert('Dívida registrada!'); carregarDividas(); }
});

async function carregarDividas() {
    const res = await fetch('http://127.0.0.1:5000/api/dividas');
    const data = await res.json();
    document.querySelector('#tabela-dividas tbody').innerHTML = data.map(d => `<tr><td>${d.cod_divida}</td><td>${d.cod_saida}</td><td>${d.nome_cliente || '-'}</td><td>R$ ${Number(d.valor_divida).toFixed(2)}</td><td>${d.data_vencimento}</td><td>${d.situacao}</td></tr>`).join('');
}

document.getElementById('pagamento-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = document.getElementById('edit_cod_pagamento').value;
    const payload = {
        cod_divida: parseInt(document.getElementById('pag_cod_divida').value),
        data_pagamento: document.getElementById('data_pagamento').value,
        valor_pago: parseFloat(document.getElementById('valor_pago').value),
        forma_pagamento: document.getElementById('forma_pagamento').value
    };
    const url = editId ? `http://127.0.0.1:5000/api/pagamentos/${editId}` : 'http://127.0.0.1:5000/api/pagamentos';
    const metodo = editId ? 'PUT' : 'POST';
    const res = await fetch(url, { method: metodo, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) { 
        alert(editId ? 'Pagamento atualizado!' : 'Pagamento registrado!'); 
        document.getElementById('pagamento-form').reset();
        document.getElementById('edit_cod_pagamento').value = '';
        document.getElementById('btn-salvar-pagamento').textContent = 'Registrar Pagamento';
        carregarPagamentos(); 
    }
});

async function carregarPagamentos() {
    const res = await fetch('http://127.0.0.1:5000/api/pagamentos');
    const data = await res.json();
    document.querySelector('#tabela-pagamentos tbody').innerHTML = data.map(p => {
        const dataFormatada = new Date(p.data_pagamento).toISOString().split('T')[0];
        return `<tr><td>${p.cod_pagamento}</td><td>${p.cod_divida}</td><td>${dataFormatada}</td><td>R$ ${Number(p.valor_pago).toFixed(2)}</td><td>${p.forma_pagamento}</td><td><button onclick="prepararEdicao(${p.cod_pagamento}, ${p.cod_divida}, '${dataFormatada}', ${p.valor_pago}, '${p.forma_pagamento}')" style="background:#f59e0b; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Editar</button></td></tr>`;
    }).join('');
}

function prepararEdicao(cod, divida, data, valor, forma) {
    document.getElementById('edit_cod_pagamento').value = cod;
    document.getElementById('pag_cod_divida').value = divida;
    document.getElementById('data_pagamento').value = data;
    document.getElementById('valor_pago').value = valor;
    document.getElementById('forma_pagamento').value = forma;
    document.getElementById('btn-salvar-pagamento').textContent = 'Atualizar Pagamento #' + cod;
    mudarAba('pagamentos');
}
