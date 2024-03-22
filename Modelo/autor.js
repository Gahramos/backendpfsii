import AutorDAO from "../Persistencia/autorDAO.js";

export default class Autor {

    #aut_codigo;
    #aut_nome;
    #aut_nacionalidade;

    constructor(codigo=0, nome="", aut_nacionalidade=0) {
        this.#aut_codigo = codigo;
        this.#aut_nome = nome;
        this.#aut_nacionalidade = aut_nacionalidade;
    }

    // Métodos de acesso públicos

    get codigo() {
        return this.#aut_codigo;
    }

    set codigo(novoCodigo) {
        this.#aut_codigo = novoCodigo;
    }

    get nome() {
        return this.#aut_nome;
    }

    set nome(novoNome) {
        this.#aut_nome = novoNome;
    }

    get aut_nacionalidade(){
        return this.#aut_nacionalidade;
    }
 


    // Override do método toJSON

    toJSON() {
        return {
            codigo: this.#aut_codigo,
            nome: this.#aut_nome,
            nacionalidade: this.#aut_nacionalidade,

        };
    }

    async gravar(){
        const autDAO = new AutorDAO();
        await autDAO.gravar(this);
     }
 
     async excluir(){
        const autDAO = new AutorDAO();
        await autDAO.excluir(this);
     }
 
     async alterar(){
        const autDAO = new AutorDAO();
        await autDAO.atualizar(this);
     }
 
     async consultar(termo){
        const autDAO = new AutorDAO();
        return await autDAO.consultar(termo);
     }
}