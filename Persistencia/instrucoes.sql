CREATE TABLE autor (
    aut_codigo INT NOT NULL AUTO_INCREMENT,
    aut_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_autor PRIMARY KEY (aut_codigo)
);

CREATE TABLE livro (
    liv_codigo INT NOT NULL AUTO_INCREMENT,
    liv_titulo VARCHAR(100) NOT NULL,
    liv_colecao VARCHAR(100) NOT NULL,
    liv_editora VARCHAR(100) NOT NULL,
    liv_ano DATE,
    liv_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    aut_codigo INT NOT NULL,
    CONSTRAINT pk_livro PRIMARY KEY (liv_codigo),
    CONSTRAINT fk_autor FOREIGN KEY (aut_codigo) REFERENCES autor (aut_codigo)
);



CADASTRAR UM AUTOR
POST
http://localhost:3000/autor
{
    "nome": "Autores da Disney"
}

EXCLUIR UM AUTOR
DELETE
http://localhost:3000/autor

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
    "qtdEstoque": 50.00,
    "autor": {
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