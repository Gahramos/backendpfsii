export default class AssuntoLivro{

    #assunto;
    #parentesco;

    constructor( assunto, parentesco){

        this.#assunto = assunto;
        this.#parentesco = parentesco;
    }

    get assunto(){
        return this.#assunto;
    }

    get parentesco(){
        return this.#parentesco;
    }
}