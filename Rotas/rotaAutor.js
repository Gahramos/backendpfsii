import { Router } from "express";
import AssuntoCtrl from "../Controle/assuntoCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const assCtrl = new AssuntoCtrl();
const rotaAssunto = new Router();

rotaAssunto
.get('/',assCtrl.consultar)
.get('/:termo', assCtrl.consultar)
.post('/',assCtrl.gravar)
.patch('/',assCtrl.atualizar)
.put('/',assCtrl.atualizar)
.delete('/',assCtrl.excluir);

export default rotaAssunto;