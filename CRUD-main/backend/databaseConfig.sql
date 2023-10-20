----- Cria um banco de dados
-- create database dw3;

create table IF NOT EXISTS cursos (
    cursoid bigserial constraint pk_cursos PRIMARY KEY,
    codigo varchar(50) UNIQUE,
    descricao VARCHAR(60),
    ativo boolean,
    deleted boolean DEFAULT false
);

insert into cursos values 
    (default, 'BSI', 'Bacharelado em Sistemas de Informação', true),
    (default, 'DIREITO', 'Bacharelado em Direito', true),
    (default, 'LETRAS', 'Licenciatura em Letras', true),
    (default, 'ADM', 'Bacharelado em Administração', false)
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS alunos (
    alunoid bigserial constraint pk_alunos PRIMARY KEY,
    prontuario varchar(10) UNIQUE,
    nome varchar(50),
    endereco VARCHAR(60),
    rendafamiliar numeric(8,2),
    datanascimento date,
    cursoid bigint constraint fk_aluno_curso REFERENCES cursos,
    deleted boolean DEFAULT false
);

insert into alunos values 
    (default, 'pront1', 'José das Neves', 'Rua A, Votuporanga', 6891.60, '2000-01-31', 
        (SELECT cursoid from CURSOS where codigo = 'BSI')),
    (default, 'pront2', 'Maria Silveira', 'Rua B, São José do Rio Preto', 7372.41, '2002-03-12', 
        (SELECT cursoid from CURSOS where codigo = 'DIREITO'))
ON CONFLICT DO NOTHING;

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;



-- PROJETO PRINCIPAL

-- Criando a tabela Contas a Pagar
CREATE TABLE contas_a_pagar (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    deleted boolean
);

-- Criando a tabela Contas a Receber
CREATE TABLE contas_a_receber (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_recebimento DATE,
    deleted boolean
);

-- Criando a tabela Fluxo de Caixa
CREATE TABLE fluxo_de_caixa (
    id SERIAL PRIMARY KEY,
    data_movimento DATE NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    tipo_movimento VARCHAR(50) CHECK (tipo_movimento IN ('Entrada', 'Saída')),
    deleted boolean
);

-- Inserindo alguns registros para teste
-- Contas a Pagar
INSERT INTO contas_a_pagar (descricao, valor, data_vencimento) VALUES ('Aluguel', 1500.00, '2023-11-01', false);
INSERT INTO contas_a_pagar (descricao, valor, data_vencimento, data_pagamento, deleted) VALUES ('Energia', 200.50, '2023-10-15', '2023-10-10',true;

-- Contas a Receber
INSERT INTO contas_a_receber (descricao, valor, data_vencimento) VALUES ('Venda de Produto X', 350.00, '2023-10-20', false);
INSERT INTO contas_a_receber (descricao, valor, data_vencimento, data_recebimento) VALUES ('Serviço Y', 500.00, '2023-10-05', '2023-10-03',true);

-- Fluxo de Caixa
INSERT INTO fluxo_de_caixa (data_movimento, descricao, valor, tipo_movimento) VALUES ('2023-10-05', 'Receita de Serviço Y', 500.00, 'Entrada',false);
INSERT INTO fluxo_de_caixa (data_movimento, descricao, valor, tipo_movimento) VALUES ('2023-10-10', 'Pagamento de Energia', -200.50, 'Saída',true);
