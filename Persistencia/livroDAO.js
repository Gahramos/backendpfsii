import Autor from '../Modelo/autor.js';
import Assunto from '../Modelo/assunto.js';
import AssuntoLivro from '../Modelo/assuntoLivro.js';
import Livro from '../Modelo/livro.js';
import conectar from './conexao.js';

export default class LivroDAO{
    async gravar(livro){

        if (livro instanceof Livro){

            const conexao = await conectar();
            await conexao.beginTransaction();


            try {
                const sql = "INSERT INTO livro(liv_titulo, liv_colecao, liv_editora, liv_ano, liv_qtdEstoque, liv_autor VALUES (?, ?, ?, ?, ?, ?)";
                const parametros = [livro.titulo, livro.colecao, livro.editora, livro.ano, livro.qtdEstoque, livro.autor.codigo];

                const retorno = await conexao.execute(sql, parametros);
                livro.codigo = retorno[0].insertId;

                for (const assunto of livro.assuntos) {
                    const sql2 = "INSERT INTO livro_assunto (liv_codigo, ass_codigo,parentesco) VALUES (?,?,?)";
                    let parametros2 = [livro.codigo,assunto.assunto.codigo,assunto.parentesco]
                    await conexao.execute(sql2,parametros2);
                 }
                    
                await conexao.commit();
                global.poolConexoes.releaseConnection(conexao);

         } catch (error) {
               await  conexao.rollback();
               throw error;
         }

         
     }
 }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            await conexao.beginTransaction();

        try {  
            const sql = `
                UPDATE livro 
                SET liv_titulo = ?, liv_colecao = ?, liv_editora = ?, 
                    liv_ano = ?, liv_qtdEstoque = ?, liv_autor = ?
                WHERE liv_codigo = ?`;
    
            const parametros = [livro.titulo, livro.colecao, livro.editora, livro.ano, livro.qtdEstoque, livro.autor.codigo, livro.codigo];
    
            await conexao.execute(sql, parametros);
    
                // Atualizar os assuntos (se houver)
                if (livro.assuntos && livro.assuntos.length > 0) {
                    for (const assunto of livro.assuntos) {
                        const sql2 = `
                            INSERT INTO livro_assunto (livro_codigo, ass_codigo, parentesco) 
                            VALUES (?, ?, ?) 
                            ON DUPLICATE KEY UPDATE parentesco = VALUES(parentesco)`;
                        const parametros2 = [livro.codigo,assunto.assunto.codigo ?? null,assunto.parentesco ?? null ];
                        await conexao.execute(sql2, parametros2);
                    }
                }
    
                await conexao.commit();
                global.poolConexoes.releaseConnection(conexao);
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const conexao = await conectar();
            await conexao.beginTransaction();
    
            try {
                const sqlAssuntos = "DELETE FROM livro_assunto WHERE liv_codigo = ?";
                const parametrosAssuntos = [livro.codigo];
                await conexao.execute(sqlAssuntos, parametrosAssuntos);
    
                const sqlLivro = "DELETE FROM livro WHERE liv_codigo = ?";
                const parametrosLivro = [livro.codigo];
                await conexao.execute(sqlLivro, parametrosLivro);
    
                await conexao.commit();
                global.poolConexoes.releaseConnection(conexao);
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }

    async consultar(termoBusca){
        const listaLivros = [];

        if(!isNaN(termoBusca)){
            const conexao = await conectar();
            const sql = `SELECT * FROM livro AS L 
            INNER JOIN autor AS D  ON L.livro_autor =  aut_codigo
            INNER JOIN livro_assunto ass ON ass.liv_codigo = L.livro_codigo
            INNER JOIN assuntos de ON ass.ass_codigo = ass.ass_codigo 
            WHERE L.liv_codigo = ?`



            const [registros, campos] = await conexao.execute(sql,[termoBusca]);


            if(registros.length > 0){
               

                const autor = new Autor(registros[0].aut_codigo,registros[0].aut_descricao,registros[0].aut_nome,registros[0].aut_nacionalidade)
                let listaAssuntos = [];
                for (const registro of registros) {

                    const assunto = new Assunto(registro.aut_codigo,registro.aut_nome,registro.aut_nacionalidade);
                    const livroDep = new AssuntoLivro(assunto,registro.parentesco);
                    listaAssuntos.push(livroAss.assunto);

                }
               
                const livro = new Livro(registros[0].liv_codigo,registros[0].liv_titulo,registros[0].liv_colecao,registros[0].liv.editora,registros[0].liv.ano,registros[0].liv.qtdEstoque,autor,listaAssuntos)

              
                listaFuncionarios.push(funcionario);
            }

        }
        return listaFuncionarios;   

    }
}