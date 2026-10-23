USE mydb;
INSERT INTO Categoria (codigo_categoria, nome_categoria) VALUES
(1, 'Laticínios'),
(2, 'Bebidas'),
(3, 'Padaria'),
(4, 'Hortifruti'),
(5, 'Limpeza'),
(6, 'Congelados'),
(7, 'Higiene Pessoal'),
(8, 'Biscoitos e Snacks'),
(9, 'Matinais e Cereais'),
(10, 'Utensílios e Descartáveis');

-- Fornecedor
INSERT INTO Fornecedor (codigo_fornec, nome_fornecedor) VALUES
(1, 'Distribuidora Laticínios Silva'),
(2, 'Ambev Distribuição'),
(3, 'Panificadora Central LTDA'),
(4, 'HortiFruti do Vale'),
(5, 'Atacado de Limpeza Express'),
(6, 'Congelados Frios S.A.'),
(7, 'Distribuidora Higiene & Vida'),
(8, 'Snacks & Cia Distribuição'),
(9, 'Produtos do Campo Alimentos'),
(10, 'Descartáveis Nacional LTDA');

-- Cliente
INSERT INTO Cliente (codigo_cliente, nome, contato) VALUES
(1, 'Maria Oliveira', '(11) 98765-4321'),
(2, 'João dos Santos', '(11) 97654-3210'),
(3, 'Ana Clara Souza', '(11) 96543-2109'),
(4, 'Carlos Eduardo', '(11) 95432-1098'),
(5, 'Fernanda Lima', '(11) 94321-0987'),
(6, 'Roberto Alves', '(11) 93210-9876'),
(7, 'Patricia Mendes', '(11) 92109-8765'),
(8, 'Lucas Gabriel', '(11) 91098-7654'),
(9, 'Juliana Paes', '(11) 90987-6543'),
(10, 'Marcelo Rocha', '(11) 89876-5432');

-- Produto
INSERT INTO Produto (codigo_produto, nome_produto, marca, peso_produto, codigo_barras, estoque_minino, preco_venda, quantd_estoque, codigo_categoria) VALUES
(1, 'Leite Integral 1L', 'Laticínio Puro', '1kg', '7891234567890', 10, 4.80, 50, 1),
(2, 'Refrigerante Cola 2L', 'SuperCola', '2kg', '7891234567891', 15, 8.50, 40, 2),
(3, 'Pão de Forma 500g', 'PãoFresco', '500g', '7891234567892', 5, 6.90, 20, 3),
(4, 'Maçã Fuji (Kg)', 'HortiValle', '1kg', '7891234567893', 8, 7.99, 30, 4),
(5, 'Detergente Neutro 500ml', 'LimpoMais', '500g', '7891234567894', 12, 2.50, 60, 5),
(6, 'Lasanha Bolonhesa 600g', 'SaborFácil', '600g', '7891234567895', 10, 14.90, 25, 6),
(7, 'Sabonete Líquido 250ml', 'PeleSuave', '250g', '7891234567896', 15, 5.20, 45, 7),
(8, 'Biscoito Recheado 140g', 'Crocante', '140g', '7891234567897', 20, 3.50, 80, 8),
(9, 'Café Torrado e Moído 500g', 'AromaReal', '500g', '7891234567898', 10, 18.90, 35, 9),
(10, 'Guardanapo de Papel 100 un', 'LimpoMais', '100g', '7891234567899', 15, 2.80, 50, 10);

-- Entrada
INSERT INTO Entrada (codigo_entrada, data_entrada, codigo_fornecedor) VALUES
(1, '2026-09-01', 1),
(2, '2026-09-05', 2),
(3, '2026-09-10', 3),
(4, '2026-09-15', 4),
(5, '2026-09-20', 5),
(6, '2026-09-21', 6),
(7, '2026-09-22', 7),
(8, '2026-09-23', 8),
(9, '2026-09-24', 9),
(10, '2026-09-25', 10);

-- Item_Entrada
INSERT INTO Item_Entrada (cod_entrada, cod_produto, quantd_recebida, preco_compra) VALUES
(1, 1, 50.000, 3.20),
(2, 2, 40.000, 5.50),
(3, 3, 20.000, 4.00),
(4, 4, 30.000, 5.00),
(5, 5, 60.000, 1.50),
(6, 6, 25.000, 9.50),
(7, 7, 45.000, 3.10),
(8, 8, 80.000, 2.00),
(9, 9, 35.000, 12.00),
(10, 10, 50.000, 1.40);

-- Lote
INSERT INTO Lote (codigo_lote, numero_lote, data_validade, quantidade_lote, codigo_entrada, codigo_produto) VALUES
(1, 'LOT-2026-001', '2026-10-15', 50.000, 1, 1),
(2, 'LOT-2026-002', '2027-03-20', 40.000, 2, 2),
(3, 'LOT-2026-003', '2026-10-05', 20.000, 3, 3),
(4, 'LOT-2026-004', '2026-10-10', 30.000, 4, 4),
(5, 'LOT-2026-005', '2028-01-01', 60.000, 5, 5),
(6, 'LOT-2026-006', '2027-06-30', 25.000, 6, 6),
(7, 'LOT-2026-007', '2028-02-15', 45.000, 7, 7),
(8, 'LOT-2026-008', '2027-01-10', 80.000, 8, 8),
(9, 'LOT-2026-009', '2027-09-20', 35.000, 9, 9),
(10, 'LOT-2026-010', '2029-05-01', 50.000, 10, 10);

-- Saída (Com nomes das colunas idênticos à estrutura informada)
INSERT INTO `Saída` (codigo_saida, data_saida, codigo_cliente) VALUES
(1, '2026-09-25', 1),
(2, '2026-09-26', 2),
(3, '2026-09-27', 3),
(4, '2026-09-28', 4),
(5, '2026-09-29', 5),
(6, '2026-09-30', 6),
(7, '2026-10-01', 7),
(8, '2026-10-01', 8),
(9, '2026-10-02', 9),
(10, '2026-10-03', 10);

-- Item_Saída
INSERT INTO `Item_Saída` (codigo_saida, codigo_lote, quantidade_saida, preco_saida) VALUES
(1, 1, 2.000, 4.80),
(2, 2, 1.000, 8.50),
(3, 3, 1.000, 6.90),
(4, 4, 3.000, 7.99),
(5, 5, 4.000, 2.50),
(6, 6, 2.000, 14.90),
(7, 7, 3.000, 5.20),
(8, 8, 5.000, 3.50),
(9, 9, 1.000, 18.90),
(10, 10, 2.000, 2.80);

-- Divida
INSERT INTO Divida (cod_divida, cod_saida, valor_divida, data_divida, data_vencimento, situacao) VALUES
(1, 1, 9.60, '2026-09-25', '2026-10-25', 'Pendente'),
(2, 2, 8.50, '2026-09-26', '2026-10-26', 'Pago'),
(3, 3, 6.90, '2026-09-27', '2026-10-27', 'Pendente'),
(4, 4, 23.97, '2026-09-28', '2026-10-28', 'Pendente'),
(5, 5, 10.00, '2026-09-29', '2026-10-29', 'Pago'),
(6, 6, 29.80, '2026-09-30', '2026-10-30', 'Pendente'),
(7, 7, 15.60, '2026-10-01', '2026-11-01', 'Pago'),
(8, 8, 17.50, '2026-10-01', '2026-11-01', 'Pendente'),
(9, 9, 18.90, '2026-10-02', '2026-11-02', 'Pago'),
(10, 10, 5.60, '2026-10-03', '2026-11-03', 'Pendente');

-- Pagamento
INSERT INTO Pagamento (cod_pagamento, cod_divida, data_pagamento, valor_pago, forma_pagamento) VALUES
(1, 2, '2026-09-27', 8.50, 'Dinheiro'),
(2, 5, '2026-09-30', 10.00, 'Pix'),
(3, 1, '2026-09-28', 5.00, 'Dinheiro'),
(4, 3, '2026-09-29', 2.00, 'Pix'),
(5, 4, '2026-09-30', 10.00, 'Cartão de Débito'),
(6, 7, '2026-10-02', 15.60, 'Pix'),
(7, 9, '2026-10-03', 18.90, 'Cartão de Crédito'),
(8, 6, '2026-10-03', 10.00, 'Dinheiro'),
(9, 8, '2026-10-03', 5.00, 'Pix'),
(10, 10, '2026-10-04', 2.00, 'Dinheiro');
