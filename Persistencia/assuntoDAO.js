import Assunto from "../Modelo/assunto.js";
import conectar from "./conexao.js";

export default class AssuntoDAO {
    async gravar(assunto) {
        try {
            if (assunto instanceof Assunto) {
                const sql = "INSERT INTO assunto(ass_nome) VALUES(?)";
                const parametros = [assunto.nome];
                const conexao = await conectar();
                const retorno = await conexao.execute(sql, parametros);
                assunto.codigo = retorno[0].insertId;
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error("Erro ao gravar assunto:", erro.message);
            throw erro;
        }
    }

    async atualizar(assunto) {
        try {
            if (assunto instanceof Assunto) {
                const sql = "UPDATE assunto SET ass_nome = ? WHERE ass_codigo = ?";
                const parametros = [assunto.nome, assunto.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error("Erro ao atualizar assunto:", erro.message);
            throw erro;
        }
    }

    async excluir(assunto) {
        try {
            if (assunto instanceof Assunto) {
                const sql = "DELETE FROM assunto WHERE ass_codigo = ?";
                const parametros = [assunto.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error("Erro ao excluir assunto:", erro.message);
            throw erro;
        }
    }

    async consultar(parametroConsulta) {
        try {
            let sql = '';
            let parametros = [];

            if (typeof parametroConsulta === 'string') {
                sql = "SELECT * FROM assunto WHERE ass_nome LIKE ?";
                parametros = ['%' + parametroConsulta + '%'];
            } else {
                sql = "SELECT * FROM assunto WHERE ass_codigo = ? ORDER BY ass_nome";
                parametros = [parametroConsulta];
            }

            const conexao = await conectar();
            const [registros, campos] = await conexao.execute(sql, parametros);
            let listaAssuntos = [];

            for (const registro of registros) {
                const assunto = new Assunto(registro.ass_codigo, registro.ass_nome);
                listaAssuntos.push(assunto);
            }

            return listaAssuntos;
        } catch (erro) {
            console.error("Erro ao consultar assuntos:", erro.message);
            throw erro;
        }
    }
}
