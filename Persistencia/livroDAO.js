import Livro from '../Modelo/livro.js';
import Assunto from '../Modelo/assunto.js';
import conectar from './conexao.js';

export default class LivroDAO {

    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = `
                INSERT INTO livro (liv_titulo, liv_colecao, liv_editora, liv_ano, liv_qtdEstoque, ass_codigo)
                VALUES (?, ?, ?, ?, ?, ?)`;
            
            const parametros = [
                livro.titulo, livro.colecao, livro.editora,
                livro.ano, livro.qtdEstoque, livro.assunto.codigo
            ];

            try {
                const conexao = await conectar();
                const retorno = await conexao.execute(sql, parametros);
                livro.codigo = retorno[0].insertId;
                global.poolConexoes.releaseConnection(conexao);
            } catch (erro) {
                throw new Error(`Erro ao gravar livro: ${erro.message}`);
            }
        }
    }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = `
                UPDATE livro 
                SET liv_titulo = ?, liv_colecao = ?, liv_editora = ?, 
                    liv_ano = ?, liv_qtdEstoque = ?, ass_codigo = ?
                WHERE liv_codigo = ?`;
    
            const parametros = [
                livro.titulo, livro.colecao, livro.editora,
                livro.ano, livro.qtdEstoque, livro.assunto.codigo, livro.codigo
            ];
    
            try {
                const conexao = await conectar();
                const [resultado] = await conexao.execute(sql, parametros);
    
                if (resultado.affectedRows > 0) {
                    global.poolConexoes.releaseConnection(conexao);
                    return "Livro atualizado com sucesso!";
                } else {
                    return "Nenhum livro foi atualizado. Livro não encontrado.";
                }
            } catch (erro) {
                throw new Error(`Erro ao atualizar livro: ${erro.message}`);
            }
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const sql = `DELETE FROM livro WHERE liv_codigo = ?`;
            const parametros = [livro.codigo];

            try {
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                global.poolConexoes.releaseConnection(conexao);
            } catch (erro) {
                throw new Error(`Erro ao excluir livro: ${erro.message}`);
            }
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }

        const conexao = await conectar();
        let listaLivros = [];

        const sql = `
            SELECT p.liv_codigo, p.liv_titulo, p.liv_colecao, p.liv_editora, 
                p.liv_ano, p.liv_qtdEstoque, assunto.ass_codigo, assunto.ass_nome
            FROM livro p
            INNER JOIN assunto ON p.ass_codigo = assunto.ass_codigo 
            WHERE p.liv_titulo LIKE ?
            ORDER BY p.liv_titulo`;

        const parametros = ['%' + termo + '%'];

        try {
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const assunto = new Assunto(registro.ass_codigo, registro.ass_nome);
                const livro = new Livro(
                    registro.liv_codigo, registro.liv_titulo,
                    registro.liv_colecao, registro.liv_editora,
                    registro.liv_ano, registro.liv_qtdEstoque,
                    assunto
                );
                listaLivros.push(livro);
            }
        } catch (erro) {
            throw new Error(`Erro ao consultar livros: ${erro.message}`);
        } finally {
            global.poolConexoes.releaseConnection(conexao);
        }

        return listaLivros;
    }
}
