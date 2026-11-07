USE sr_hub;

CREATE TABLE IF NOT EXISTS usuarias (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    periodo_disponivel VARCHAR(20),
    horas_livres_dia INT,
    quantidade_filhos INT,
    area_interesse VARCHAR(50),
    tem_computador BOOLEAN
);

DESCRIBE usuarias;

CREATE TABLE IF NOT EXISTS vagas (
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    empresa VARCHAR(100),
    descricao TEXT NOT NULL,
    modalidade VARCHAR(20) NOT NULL,
    horario_flexivel BOOLEAN,
    carga_horaria_semanal INT NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    data_publicacao DATE NOT NULL
    );
    
    DESCRIBE vagas;
    
    SHOW TABLES;
    
CREATE TABLE IF NOT EXISTS cursos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    area VARCHAR(50) NOT NULL,
    carga_horaria INT NOT NULL,
    no_proprio_ritmo BOOLEAN NOT NULL,
    gratuito BOOLEAN NOT NULL,
    link VARCHAR(255),
    prazo_acesso_dias INT NULL
    );
    
    SHOW TABLES;
    
CREATE TABLE IF NOT EXISTS candidaturas(
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuaria_id INT NOT NULL,
    vaga_id INT NOT NULL,
    data_candidatura DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (usuaria_id) REFERENCES usuarias(id),
    FOREIGN KEY (vagas_id) REFERENCES vagas(id)
    );
    
    
    