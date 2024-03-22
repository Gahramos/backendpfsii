import express from 'express';
import cors from 'cors';
import rotaAutor from './Rotas/rotaAutor.js';
import rotaLivro from './Rotas/rotaLivro.js';
import rotaAssunto from './Rotas/rotaAssunto.js';
import dotenv from 'dotenv';
import session from 'express-session';
import rotaLogin from './Rotas/rotaLogin.js';
import { verificarAcesso } from './Seguranca/Autenticacao.js';
const host='0.0.0.0';
const porta='3000';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'm1Nh4Ch4v3SeCr3T4',
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin);
app.use('/autor',verificarAcesso,rotaAutor);
app.use('/livro',verificarAcesso,rotaLivro);
app.use('/assunto',verificarAcesso,rotaAssunto);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
