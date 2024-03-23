import Autor from "../Modelo/autor.js";
import Assunto from "../Modelo/assunto.js";
import AssuntoLivro from "../Modelo/assuntoLivro.js";
import Livro from "../Modelo/livro.js";
import LivroDAO from "../Persistencia/livroDAO.js";
export default class LivroCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {

            const dados = requisicao.body;
            const titulo = dados.titulo;
            const colecao = dados.colecao;
            const editora = dados.editora;
            const ano = dados.ano;
            const qtdEstoque = dados.qtdEstoque;
            //const autor = dados.autor;
            //const assuntoLivro = dados.assuntos;

            // const objAutor = new Autor(autor.codigo);

            // const assuntos = [];
            // for (const assunto of assuntoLivro) {
            //     const ass = new Assunto(assunto.codigo)

            //     const objAssuntoLivro = new AssuntoLivro(ass,assunto.parentesco)

            //     assuntos.push(objAssuntoLivro);
            // }

            const livro = new Livro(0,titulo,colecao,editora,dados.ano,qtdEstoque/*,objAutor,assuntos*/);
                livro.gravar(livro).then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": livro.codigo,
                        "mensagem": "Livro cadastrado com sucesso!"
                    })
                })

                    .catch((erro) => {
                     resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao cadastrado o livro:" + erro.message
                        });
                    });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um livro!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const titulo = dados.titulo;
            const colecao = dados.colecao;
            const editora = dados.editora;
            const ano = dados.ano;
            const qtdEstoque = dados.qtdEstoque;
            const autor = dados.autor;
            const assuntoLivro = dados.assuntos;


            const objAutor = new Autor(autor.codigo);

            const assuntos = [];
            for (const assunto of assuntoLivro) {
                    const ass = new Assunto(assunto.codigo);
                    const objAssuntoLivro = new AssuntoLivro(ass,assunto.parentesco);
                    assuntos.push(objAssuntoLivro);
            }

            const livro = new Livro(codigo,titulo,colecao,editora,ano,qtdEstoque,objAutor,assuntos);
            
                //resolver a promise
                livro.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro alterado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao alterar o livro:" + erro.message
                        });
                    });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para alterar um livro!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const livro = new Livro(codigo);
                //resolver a promise
                livro.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Livro apagado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao apagado o livro:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do livro!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um livro!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
       
        let termo = requisicao.params.termo;
        
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const livro = new Livro();
            livro.consultar(termo).then((listaLivros) => {
                resposta.json(
                    {
                        status: true,
                        listaLivros
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os livros: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar os livros!"
            });
        }
    }
}