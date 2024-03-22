import Assunto from "../Modelo/assunto.js";
import conectar from "./conexao.js";

export default class AssuntoDAO {
    async gravar(assuntos) {
            if (assuntos instanceof Assunto) {
                const sql = "INSERT INTO assuntos(ass_nome) VALUES(?)";
                const parametros = [assuntos.nome];
                const conexao = await conectar();
                const retorno = await conexao.execute(sql, parametros);
                assuntos.codigo = retorno[0].insertId;
                global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(assuntos) {
            if (assuntos instanceof Assunto) {
                const sql = "UPDATE assunto SET ass_nome = ? WHERE ass_codigo = ?";
                const parametros = [assuntos.nome, assuntos.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
    }

    async excluir(assuntos) {
        if (assuntos instanceof Assunto) {
            const sql = "DELETE FROM assunto WHERE ass_codigo = ?";
            const parametros = [assuntos.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo){

        var condicao="";
        let valores;
    
        if (!isNaN(parseFloat(termo)) && isFinite(termo)){
            condicao = " ass_codigo = "
            valores = [termo];
        }
        else{
            condicao = " ass_nome LIKE "
            valores = ['%' + termo +'%'];
        }
        const conexao = await conectar();
        const sql = "SELECT * FROM assuntos WHERE "+condicao+" ? ORDER BY ass_nome";
        console.log(sql);
        const [rows] = await conexao.query(sql,valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaAss = [];
    
        for(const row of rows){
           
            const assuntos = new Assunto(row['ass_codigo'],row['dep_nome']);
            listaAss.push(assuntos );
        }
    
        return listaAss;
    }
    
    }