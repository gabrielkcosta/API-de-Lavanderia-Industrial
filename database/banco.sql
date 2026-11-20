CREATE DATABASE IF NOT EXISTS lavanderia_industrial  ;
USE lavanderia_industrial  ;

CREATE TABLE servico_lavagem (
  id_servico INT AUTO_INCREMENT PRIMARY KEY,
  descriçao VARCHAR(150) NOT NULL,
  tipo_tecido  VARCHAR(100) NOT NULL,
  valor DECIMAL(15,2) NOT NULL
);

CREATE TABLE equipamento (
  id_equipamento INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  patrimonio VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL
);

CREATE TABLE colaborador (
  id_colaborador INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  matricula VARCHAR(100) NOT NULL,
  turno VARCHAR(50) NOT NULL
);