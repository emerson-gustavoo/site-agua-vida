-- AquaVida Natação — script de criação do banco de dados
-- Como usar: phpMyAdmin > aba "Importar" > escolher este arquivo

-- Cria o banco (se ainda não existir) com suporte a acentos (utf8mb4)
CREATE DATABASE IF NOT EXISTS aquavida
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco para criar as tabelas dentro dele
USE aquavida;

-- Apaga as tabelas se ja existirem (permite importar o script de novo do zero)
DROP TABLE IF EXISTS orcamentos;
DROP TABLE IF EXISTS contatos;
DROP TABLE IF EXISTS depoimentos;


-- Tabela ORCAMENTOS: pedidos de orçamento feitos nas paginas
-- de serviço (servico1.html, servico2.html, servico3.html)
CREATE TABLE orcamentos (
  id            INT AUTO_INCREMENT PRIMARY KEY,       -- numero unico gerado automaticamente
  servico       VARCHAR(100) NOT NULL,                -- nome do serviço (ex.: Hidroginastica)
  nome          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL,
  telefone      VARCHAR(20)  NOT NULL,
  endereco      VARCHAR(200),
  cidade        VARCHAR(100),
  uf            CHAR(2),
  data_desejada DATE,                                 -- pode ficar vazia (NULL)
  observacoes   TEXT,
  data_envio    TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- preenchida sozinha com a data/hora do envio
);


-- Tabela CONTATOS: mensagens do formulario "Fale Conosco" (index)
CREATE TABLE contatos (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  mensagem   TEXT NOT NULL,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabela DEPOIMENTOS: depoimentos exibidos na pagina inicial
CREATE TABLE depoimentos (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  texto      TEXT NOT NULL,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Depoimentos iniciais (os 5 que estavam fixos no HTML do index)
INSERT INTO depoimentos (nome, texto) VALUES
('Fernanda Baldissera',
 'Minha filha começou na turma de bebês com 8 meses e hoje, com 4 anos, já nada sozinha. A paciência e o carinho da professora Camila fizeram toda a diferença!'),
('Marcos Antônio Dallagnol',
 'Tinha 42 anos e nunca tinha conseguido nadar. Em 6 meses de aula na AquaVida aprendi crawl e costas, e hoje nado 1.500 metros por treino.'),
('Ilse Marlene Kruger',
 'Faço hidroginástica três vezes por semana desde 2023. Minhas dores no joelho diminuíram muito e ganhei uma turma de amigas. Ambiente limpo, aquecido e professores atenciosos.'),
('Jandir Costella',
 'Meu filho de 5 anos tinha pavor de água. Em poucos meses ele já pedia pra chegar mais cedo na aula. A metodologia deles respeita o ritmo de cada criança.'),
('Patrícia Zanella',
 'Sou gestante e a hidroginástica da AquaVida foi recomendação da minha médica. As professoras adaptam todos os exercícios. Me sinto segura e muito bem cuidada.');
