CREATE TABLE assunto (
    ass_codigo INT NOT NULL AUTO_INCREMENT,
    ass_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_assunto PRIMARY KEY (ass_codigo)
);

CREATE TABLE livro (
    liv_codigo INT NOT NULL AUTO_INCREMENT,
    liv_titulo VARCHAR(100) NOT NULL,
    liv_colecao VARCHAR(100) NOT NULL,
    liv_editora VARCHAR(100) NOT NULL,
    liv_ano DATE,
    liv_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    ass_codigo INT NOT NULL,
    CONSTRAINT pk_livro PRIMARY KEY (liv_codigo),
    CONSTRAINT fk_assunto FOREIGN KEY (ass_codigo) REFERENCES assunto (ass_codigo)
);



CADASTRAR UM ASSUNTO
POST
http://localhost:3000/assunto
{
    "nome": "Em busca da felicidade"
}

EXCLUIR UM ASSUNTO
DELETE
http://localhost:3000/assunto

{
    "codigo": "1" Exemplo: numero do codigo
}

CADASTRAR UM LIVRO
POST
http://localhost:3000/livro
{
    "titulo": "Título do Livro",
    "colecao": "Coleção do Livro",
    "editora": "Editora do Livro",
    "ano": "2024-02-21",
    "qtdEstoque": 50,
    "assunto": {
        "codigo": 1
    }
}

EXCLUIR UM LIVRO
DELETE
http://localhost:3000/livro
{
    "codigo": 1 
}
*colocar o codigo do livro

ALTERAR DADOS DO LIVRO
PUT
http://localhost:3000/livro
{
    "codigo": 10,
    "titulo": "Título do Livro",
    "colecao": "Coleção do Livro",
    "editora": "Editora do Livro",
    "ano": "2024-02-21",
    "qtdEstoque": "75.00",
    "assunto": {
        "codigo": 3,
        "nome": "Em busca da felicidade"
    }
}


-- Tabela para armazenar informações sobre os Livros
CREATE TABLE Livros (
    LivroID INT PRIMARY KEY,
    Titulo VARCHAR(255) NOT NULL,
    liv_colecao VARCHAR(100) NOT NULL,
    liv_editora VARCHAR(100) NOT NULL,
    liv_ano DATE,
    liv_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,

);

-- Tabela para armazenar informações sobre os Autores
CREATE TABLE Autores (
    AutorID INT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Nacionalidade VARCHAR(100),
);

-- Tabela de associação para representar o relacionamento muitos para muitos
CREATE TABLE LivrosAutores (
    LivroID INT,
    AutorID INT,
    PRIMARY KEY (LivroID, AutorID),
    FOREIGN KEY (LivroID) REFERENCES Livros(LivroID),
    FOREIGN KEY (AutorID) REFERENCES Autores(AutorID)
);

-- Exemplo de inserção de dados
INSERT INTO Livros (LivroID, Titulo, AnoPublicacao) VALUES
(1, 'Livro A', 2000),
(2, 'Livro B', 2010);

INSERT INTO Autores (AutorID, Nome, Nacionalidade) VALUES
(1, 'Autor X', 'Brasileiro'),
(2, 'Autor Y', 'Americano');

INSERT INTO LivrosAutores (LivroID, AutorID) VALUES
(1, 1), -- Livro A é escrito pelo Autor X
(1, 2), -- Livro A é coescrito pelo Autor Y
(2, 2); -- Livro B é escrito pelo Autor Y