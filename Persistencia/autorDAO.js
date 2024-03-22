import Autor from "../Modelo/autor.js";
import conectar from "./conexao.js";

export default class AutorDAO{

    async gravar(autores) {
        if (autores instanceof Autor) {
            const sql = `INSERT INTO autores(
                aut_nome,aut_nacionalidade)
                VALUES(?,?)`;
            const parametros = [autores.nome, autores.nacionalidade];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            autores.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(autores) {
        if (autores instanceof Autor) {
            const sql = `UPDATE autores SET aut_nome = ?, aut_nacionalidade = ? WHERE aut_codigo = ?`;
            const parametros = [autores.nome, autores.nacionalidade, autores.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(autores) {
        if (autores instanceof Autor) {
            const sql = `DELETE FROM autores WHERE aut_codigo = ?`;
            const parametros = [autores.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

   async consultar(termo){

    var condicao="";
    let valores;

    if (!isNaN(parseFloat(termo)) && isFinite(termo)){
        condicao = " aut_codigo = "
        valores = [termo];
    }
    else{
        condicao = " aut_nome LIKE "
        valores = ['%' + termo +'%'];
    }

    const conexao = await conectar();
    const sql = "SELECT * FROM autores WHERE "+condicao+" ? ORDER BY aut_nome";
    console.log(sql);
    const [rows] = await conexao.query(sql,valores);
    global.poolConexoes.releaseConnection(conexao);
    const listaAut = [];

    for(const row of rows){
       
        const autores = new Autor(row['aut_codigo'],row['aut_nome'],row['aut_nacionalidade']);
        listaAut.push(autores);
    }

    return listaAut;
}

}