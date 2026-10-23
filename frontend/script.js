document.getElementById('carregar-produtos').addEventListener('click', async () => {
    const tabela = document.getElementById('tabela-produtos');
    tabela.innerHTML = '<tr><td colspan="5" style="text-align: center;">Carregando dados...</td></tr>';

    try {
        const resposta = await fetch('http://127.0.0.1:5000/api/produtos');
        if (!resposta.ok) {
            throw new Error('Erro ao buscar os produtos no servidor.');
        }

        const produtos = await resposta.json();
        tabela.innerHTML = '';

        if (produtos.length === 0) {
            tabela.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum produto encontrado.</td></tr>';
            return;
        }

        produtos.forEach(prod => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${prod.codigo_produto}</td>
                <td>${prod.nome_produto}</td>
                <td>${prod.marca}</td>
                <td>R$ ${Number(prod.preco_venda).toFixed(2)}</td>
                <td>${prod.quantd_estoque}</td>
            `;
            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);
        tabela.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">Erro ao conectar com o backend: ${erro.message}</td></tr>`;
    }
});
