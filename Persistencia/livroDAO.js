import Livro from '../Modelo/livro.js';
import Autor from '../Modelo/autor.js';
import conectar from './conexao.js';

export default class LivroDAO {

    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = `INSERT INTO livro(liv_titulo, liv_colecao,
                liv_editora, liv_ano, liv_qtdEstoque, aut_codigo)
                VALUES(?,?,?,?,?,?)`;
            const parametros = [livro.titulo, livro.colecao, livro.editora,
            livro.ano, livro.qtdEstoque, livro.autor.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            livro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = `UPDATE livro SET liv_titulo = ?, liv_colecao = ?,
            liv_editora = ?, liv_ano = ?, liv_qtdEstoque = ?, aut_codigo = ?
            WHERE liv_codigo = ?`;
            const parametros = [livro.titulo, livro.colecao, livro.editora,
            livro.ano, livro.qtdEstoque, livro.autor.codigo, livro.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const sql = `DELETE FROM livro WHERE liv_codigo = ?`;
            const parametros = [livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaLivros = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do livro
            const sql = `SELECT p.liv_codigo, p.liv_titulo,
              p.liv_colecao, p.liv_editora, p.liv_ano, 
              p.liv_qtdEstoque, c.aut_codigo, c.aut_titulo
              FROM livro p
              INNER JOIN autor c ON p.aut_codigo = c.aut_codigo
              WHERE p.liv_codigo = ?
              ORDER BY p.liv_titulo               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const autor = new Autor(registro.aut_codigo, registro.aut_titulo);
                const livro = new Livro(registro.liv_codigo,registro.liv_titulo,
                                            registro.liv_colecao,registro.liv_editora,
                                            registro.liv_ano, registro.liv_qtdEstoque,
                                            autor
                                            );
                listaLivros.push(livro);
            }
        }
        else
        {
            //consulta pela descrição do livro
            const sql = `SELECT p.liv_codigo, p.liv_titulo,
              p.liv_colecao, p.liv_editora, p.liv_ano, 
              p.liv_qtdEstoque, c.aut_codigo, c.aut_titulo
              FROM livro p
              INNER JOIN autor c ON p.aut_codigo = c.aut_codigo 
              WHERE p.liv_titulo like ?
              ORDER BY p.liv_titulo               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const autor = new Autor(registro.aut_codigo, registro.aut_titulo);
                const livro = new Livro(registro.liv_codigo,registro.liv_titulo,
                                            registro.liv_colecao,registro.liv_editora,
                                            registro.liv_ano, registro.liv_qtdEstoque,
                                            autor
                                            );
                listaLivros.push(livro);
            }
        }

        return listaLivros;
    }
}