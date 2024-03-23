-- Tabela Autor
CREATE TABLE Autor (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    nacionalidade VARCHAR(100)
);


-- Tabela Livro
CREATE TABLE Livro (
    codigo INT PRIMARY KEY,
    titulo VARCHAR(255),
    colecao VARCHAR(100),
    editora VARCHAR(100),
    ano INT,
    qtdEstoque INT
);

-- Tabela Assunto
CREATE TABLE Assunto (
    codigo INT PRIMARY KEY,
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
