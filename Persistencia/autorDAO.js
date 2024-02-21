import Autor from "../Modelo/autor.js";
import conectar from "./conexao.js";

export default class AutorDAO {
    async gravar(autor) {
        try {
            if (autor instanceof Autor) {
                const sql = "INSERT INTO autor(aut_nome) VALUES(?)";
                const parametros = [autor.nome];
                const conexao = await conectar();
                const retorno = await conexao.execute(sql, parametros);
                autor.codigo = retorno[0].insertId;
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error("Erro ao gravar autor:", erro.message);
            throw erro;
        }
    }

    async atualizar(autor) {
        try {
            if (autor instanceof Autor) {
                const sql = "UPDATE autor SET aut_nome = ? WHERE aut_codigo = ?";
                const parametros = [autor.nome, autor.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error("Erro ao atualizar autor:", erro.message);
            throw erro;
        }
    }

    async excluir(autor) {
        try {
            if (autor instanceof Autor) {
                const sql = "DELETE FROM autor WHERE aut_codigo = ?";
                const parametros = [autor.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            }
        } catch (erro) {
            console.error("Erro ao excluir autor:", erro.message);
            throw erro;
        }
    }

    async consultar(parametroConsulta) {
        try {
            let sql = '';
            let parametros = [];

            if (typeof parametroConsulta === 'string') {
                sql = "SELECT * FROM autor WHERE aut_nome LIKE ?";
                parametros = ['%' + parametroConsulta + '%'];
            } else {
                sql = "SELECT * FROM autor WHERE aut_codigo = ? ORDER BY aut_nome";
                parametros = [parametroConsulta];
            }

            const conexao = await conectar();
            const [registros, campos] = await conexao.execute(sql, parametros);
            let listaAutores = [];

            for (const registro of registros) {
                const autor = new Autor(registro.aut_codigo, registro.aut_nome);
                listaAutores.push(autor);
            }

            return listaAutores;
        } catch (erro) {
            console.error("Erro ao consultar autores:", erro.message);
            throw erro;
        }
    }
}
