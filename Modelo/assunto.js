import AssuntoDAO from "../Persistencia/assuntoDAO.js";
//não esqueça do .js no final da importação

export default class Assunto {
    //definição dos atributos privados
    #codigo;
    #nome;

    constructor(codigo=0, nome=''){
        this.#codigo=codigo;
        this.#nome=nome;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novaDesc){
        this.#nome = novaDesc;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            nome:this.#nome
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const assDAO = new AssuntoDAO();
        await assDAO.gravar(this);
    }

    async excluir(){
        const assDAO = new AssuntoDAO();
        await assDAO.excluir(this);
    }

    async atualizar(){
        const assDAO = new AssuntoDAO();
        await assDAO.atualizar(this);

    }

    async consultar(parametro){
        const assDAO = new AssuntoDAO();
        return await assDAO.consultar(parametro);
    }
}