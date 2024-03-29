import LivroDAO from "../Persistencia/livroDAO.js";

export default class Livro{
    #liv_codigo;
    #liv_titulo;
    #liv_colecao;
    #liv_editora;
    #liv_ano;
    #liv_qtdEstoque;
    //#liv_autor;
    //#assuntos;


    constructor(codigo=0,titulo="", colecao=0, editora=0,ano='', qtdEstoque=0 /*,autor, assuntos*/){              
        this.#liv_codigo=codigo;
        this.#liv_titulo=titulo;
        this.#liv_colecao=colecao;
        this.#liv_editora=editora;
        this.#liv_ano=ano;
        this.#liv_qtdEstoque=qtdEstoque;
        //this.#liv_autor=autor;
        //this.#assuntos = assuntos;
    }

    get codigo(){
        return this.#liv_codigo;
    }
    set codigo(novoCodigo){
        this.#liv_codigo = novoCodigo;
    }

    get titulo(){
        return this.#liv_titulo;
    }

    set titulo(novoTitulo){
        this.#liv_titulo=novoTitulo;
    }

    get colecao(){
        return this.#liv_colecao;
    }

    set colecao(novaColecao){
        this.#liv_colecao = novaColecao
    }

    get editora(){
        return this.#liv_editora;
    }
    
    set editora(novaEditora){
        this.#liv_editora = novaEditora
    }

    get ano(){
        return this.#liv_ano;
    }

    set ano(novoAno){
        this.#liv_ano = novoAno;
    }

    get qtdEstoque(){
        return this.#liv_qtdEstoque;
    }

    set qtdEstoque(novaQtdEstoque){
        this.#liv_qtdEstoque = novaQtdEstoque;
    }


    // get autor(){
    //     return this.#liv_autor;
    // }

    // set autor(novoAut){
    //     return this.#liv_autor = novoAut;
    // }

    // get assuntos(){
    //     return this.#assuntos
    // }


    toJSON(){
        return {
            codigo:this.#liv_codigo,
            titulo:this.#liv_titulo,
            colecao:this.#liv_colecao,
            editora:this.#liv_editora,
            ano:this.#liv_ano,
            qtdEstoque:this.#liv_qtdEstoque//,
            //autor:this.#liv_autor,
            //assuntos: this.#assuntos
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