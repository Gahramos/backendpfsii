import Livro from '../Modelo/livro.js';
import Autor from '../Modelo/autor.js';
import conectar from './conexao.js';

export default class LivroDAO {

    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = `
                INSERT INTO livro (liv_titulo, liv_colecao, liv_editora, liv_ano, liv_qtdEstoque, aut_codigo)
                VALUES (?, ?, ?, ?, ?, ?)`;
            
            const parametros = [
                livro.titulo, livro.colecao, livro.editora,
                livro.ano, livro.qtdEstoque, livro.autor.codigo
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
                    liv_ano = ?, liv_qtdEstoque = ?, aut_codigo = ?
                WHERE liv_codigo = ?`;
    
            const parametros = [
                livro.titulo, livro.colecao, livro.editora,
                livro.ano, livro.qtdEstoque, livro.autor.codigo, livro.codigo
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
console.log ("teste")
        const conexao = await conectar();
        let listaLivros = [];
        const sql = `
        SELECT Livro.codigo AS codigo_livro, Livro.titulo, Livro.colecao, 
        Livro.editora, Livro.ano, Livro.qtdEstoque, 
        Autor.codigo AS codigo_autor, Autor.nome AS nome_autor, Autor.nacionalidade,
         Assunto.nome FROM Assunto, Livro INNER JOIN LivroAutor 
         ON Livro.codigo = LivroAutor.codigoLivro INNER JOIN Autor 
         ON LivroAutor.codigoAutor = Autor.codigo INNER JOIN LivroAssunto 
         ON LivroAssunto.codigoLivro = Livro.codigo

            WHERE Livro.titulo LIKE ?
			ORDER BY Livro.titulo`;

        const parametros = ['%' + termo + '%'];

        try {
            const [registros, campos] = await conexao.execute(sql, parametros);
console.log (registros.length)          
            for (const registro of registros) {
                const autor = new Autor(registro.codigo_autor, registro.nome_autor);
                const livro = new Livro(
                    registro.codigo_livro, registro.titulo,
                    registro.colecao, registro.editora,
                    registro.ano, registro.qtdEstoque,
                    registro.nome_autor, registro.nacionalidade, registro.nome
                );
                console.log(registro.codigo_livro)
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