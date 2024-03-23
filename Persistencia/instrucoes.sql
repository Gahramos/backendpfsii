-- Tabela Autor
CREATE TABLE Autor (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    nacionalidade VARCHAR(100)
);

-- Tabela Livro
CREATE TABLE Livro (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    colecao VARCHAR(100),
    editora VARCHAR(100),
    ano DATE,
    qtdEstoque INT
);

-- Tabela Assunto
CREATE TABLE Assunto (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

-- Tabela de relacionamento entre Livro e Autor (Muitos para Muitos)
CREATE TABLE LivroAutor (
    codigoLivro INT,
    codigoAutor INT,
    FOREIGN KEY (codigoLivro) REFERENCES Livro(codigo),
    FOREIGN KEY (codigoAutor) REFERENCES Autor(codigo),
    PRIMARY KEY (codigoLivro, codigoAutor)
);

-- Tabela de relacionamento entre Livro e Assunto (1 para Muitos)
CREATE TABLE LivroAssunto (
    codigoLivro INT,
    codigoAssunto INT,
    FOREIGN KEY (codigoLivro) REFERENCES Livro(codigo),
    FOREIGN KEY (codigoAssunto) REFERENCES Assunto(codigo),
    PRIMARY KEY (codigoLivro, codigoAssunto)
);

-- Inserindo dados na tabela Autor
INSERT INTO Autor (nome, nacionalidade) VALUES
('Autor A', 'Nacionalidade A');

-- Inserindo dados na tabela Livro
INSERT INTO Livro (titulo, colecao, editora, ano, qtdEstoque) VALUES
('Livro 1', 'Coleção A', 'Editora X', '2020-02-02', 50); -- Corrigido para usar aspas simples

-- Inserindo dados na tabela Assunto
INSERT INTO Assunto (nome) VALUES
('Assunto A');

-- Inserindo dados na tabela de relacionamento LivroAutor
INSERT INTO LivroAutor (codigoLivro, codigoAutor) VALUES
(1, 1); -- Supondo que o código do livro e do autor inseridos anteriormente sejam 1

-- Inserindo dados na tabela de relacionamento LivroAssunto
INSERT INTO LivroAssunto (codigoLivro, codigoAssunto) VALUES
(1, 1); -- Supondo que o código do livro e do assunto inseridos anteriormente sejam 1
