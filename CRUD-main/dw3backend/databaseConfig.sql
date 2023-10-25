----- Cria um banco de dados
-- create database dw3;

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


insert into usuarios values (default, 'Kainan', crypt('Kainan', gen_salt('bf')))

ON CONFLICT DO NOTHING;

-- Criando a tabela Contas a Pagar
CREATE TABLE contas_a_pagar (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    deleted boolean
);

-- Inserindo alguns registros para teste
-- Contas a Pagar
INSERT INTO contas_a_pagar (descricao, valor, data_vencimento) VALUES ('Aluguel', 1500.00, '2023-11-01');
INSERT INTO contas_a_pagar (descricao, valor, data_vencimento, data_pagamento, deleted) VALUES ('Energia', 200.50, '2023-10-15', '2023-10-10');
