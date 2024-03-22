import Autor from "../Modelo/autor.js";

export default class AutorCtrl {

    gravar(requisicao,resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {  

            const dados = requisicao.body;
            const nome = dados.nome;
            const nacionalidade = dados.nacionalidade;


            if(nome && nacionalidade  ){
                const autor = new Autor(0,nome,nacionalidade);
                autor.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": autor.codigo,
                        "mensagem": "Autor incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar um novo autor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os campos do autor!"
                });
            }
        }
    }

    atualizar(requisicao,resposta){
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {

            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const nacionalidade = dados.nacionalidade;



            console.log(codigo);
            console.log(nome);
            console.log(nacionalidade);


            if (codigo != null && nome != null && nacionalidade != null ) {
                const autor = new Autor(codigo,nome,nacionalidade)

                autor.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Autor atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o Autor:" + erro.message
                        });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os campos do autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar o autor!"
            });
        }
    }

    excluir(requisicao,resposta){
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            
            if(codigo){
                const autor = new Autor(codigo)
                autor.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Autor excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o autor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um autor!"
            });
        }

    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const autor = new Autor();
            autor.consultar(termo).then((listaAutores)=>{
                resposta.json(
                    {
                        status:true,
                        listaAutores
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os Autores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar Autores!"
            });
        }
    }

}