import Livro from "../Modelo/livro.js";
import AutorDAO from "../Persistencia/autorDAO.js";
import LivroDAO from "../Persistencia/livroDAO.js";

export default class LivroCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        
        try {
            if (requisicao.method === 'POST' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const { titulo, colecao, editora, ano, qtdEstoque, autor } = dados;

                if (titulo && colecao && editora && ano && qtdEstoque >= 0 && autor && autor.codigo) {
                    const autorDAO = new AutorDAO();
                    const autorExistente = await autorDAO.consultar(autor.codigo);

                    if (autorExistente.length === 0) {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Autor não encontrado. Informe um autor válido!"
                        });
                        return;
                    }

                    const livro = new Livro(0, titulo, colecao, editora, ano, qtdEstoque, autorExistente[0]);
                    await livro.gravar();

                    resposta.status(200).json({
                        status: true,
                        codigoGerado: livro.codigo,
                        mensagem: "Livro incluído com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Por favor, forneça todos os dados do livro segundo a documentação da API!"
                    });
                }
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, utilize o método POST para cadastrar um livro!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: "Erro ao registrar o livro: " + erro.message
            });
        }
    }

 async atualizar(requisicao, resposta) {
    resposta.type('application/json');
    
    try {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { codigo, titulo, colecao, editora, ano, qtdEstoque, autor } = dados;

            if (codigo && titulo && colecao && editora && ano && qtdEstoque >= 0 && autor && autor.codigo) {
                const autorDAO = new AutorDAO();
                const autorExistente = await autorDAO.consultar(autor.codigo);

                if (autorExistente.length === 0) {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Autor não encontrado. Informe um autor válido!"
                    });
                    return;
                }

                const livroDAO = new LivroDAO();
                const livroExistente = await livroDAO.consultar(codigo);

                if (livroExistente.length === 0) {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Livro não encontrado. Informe um livro válido!"
                    });
                    return;
                }

                const livro = new Livro(codigo, titulo, colecao, editora, ano, qtdEstoque, autorExistente[0]);
                await livro.atualizar();

                resposta.status(200).json({
                    status: true,
                    mensagem: "Livro atualizado com sucesso!"
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, informe todos os dados do livro segundo a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, utilize os métodos PUT ou PATCH para atualizar um livro!"
            });
        }
    } catch (erro) {
        resposta.status(500).json({
            status: false,
            mensagem: "Erro ao atualizar o livro: " + erro.message
        });
    }
}


    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        
        try {
            if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const codigo = dados.codigo;

                if (codigo) {
                    const livro = new Livro(codigo);
                    await livro.excluir();

                    resposta.status(200).json({
                        status: true,
                        mensagem: "Livro excluído com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Por favor, informe o código do livro!"
                    });
                }
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, utilize o método DELETE para excluir um livro!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: "Erro ao excluir o livro: " + erro.message
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        
        try {
            //express, por meio do controle de rotas, será
            //preparado para esperar um termo de busca
            let termo = requisicao.params.termo;
            if (!termo) {
                termo = "";
            }

            if (requisicao.method === "GET") {
                const livro = new Livro();
                const listaLivros = await livro.consultar(termo);
                resposta.json({
                    status: true,
                    listaLivros
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Por favor, utilize o método GET para consultar livros!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: "Não foi possível obter os livros: " + erro.message
            });
        }
    }
}
