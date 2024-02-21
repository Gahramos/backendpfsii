import LivroDAO from "../Persistencia/livroDAO.js";

export default class Livro{
    #codigo;
    #titulo;
    #colecao;
    #editora;
    #ano;
    #qtdEstoque;
    #autor;


    constructor(codigo=0,titulo="", colecao=0, 
                editora=0,ano='', qtdEstoque=0,
                autor={}
                ){
        this.#codigo=codigo;
        this.#titulo=titulo;
        this.#colecao=colecao;
        this.#editora=editora;
        this.#ano=ano;
        this.#qtdEstoque=qtdEstoque;
        this.#autor=autor;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get titulo(){
        return this.#titulo;
    }

    set titulo(novaDesc){
        this.#titulo=novaDesc;
    }

    get colecao(){
        return this.#colecao;
    }

    set colecao(novoPreco){
        this.#colecao = novoPreco
    }

    get editora(){
        return this.#editora;
    }
    
    set editora(novoPreco){
        this.#editora = novoPreco
    }

    get ano(){
        return this.#ano;
    }

    set ano(novaData){
        this.#ano = novaData;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }


    get autor(){
        return this.#autor;
    }

    set autor(novoAut){
        return this.#autor = novoAut;
    }


    toJSON(){
        return {
            codigo:this.#codigo,
            titulo:this.#titulo,
            colecao:this.#colecao,
            editora:this.#editora,
            ano:this.#ano,
            qtdEstoque:this.#qtdEstoque,
            autor:this.#autor,
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const livDAO = new LivroDAO();
        await livDAO.gravar(this);
     }
 
     async excluir(){
        const livDAO = new LivroDAO();
        await livDAO.excluir(this);
     }
 
     async alterar(){
        const livDAO = new LivroDAO();
        await livDAO.atualizar(this);
     }
 
     async consultar(termo){
        const livDAO = new LivroDAO();
        return await livDAO.consultar(termo);
     }

}