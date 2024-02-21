import Autor from "../Modelo/autor.js";or
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class AutorDAO{
    async gravar(autor){
        if (autor instanceof Autor){
            const sql = "INSERT INTO autor(aut_nome) VALUES(?)"; 
            const parametros = [autor.nome];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            autor.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(autor){
        if (autor instanceof Autor){
            const sql = "UPDATE autor SET aut_nome = ? WHERE aut_codigo = ?"; 
            const parametros = [autor.nome, autor.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(autor){
        if (autor instanceof Autor){
            const sql = "DELETE FROM autor WHERE aut_codigo = ?"; 
            const parametros = [autor.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da autor
            sql='SELECT * FROM autor WHERE aut_codigo = ? order by aut_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela nome
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM autor WHERE aut_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaAutores= [];
        for (const registro of registros){
            const autor = new Autor(registro.aut_codigo,registro.aut_nome);
            listaAutores.push(autor);
        }
        return listaAutores;
    }
}