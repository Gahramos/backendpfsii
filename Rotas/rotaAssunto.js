import { Router } from "express";
import AssuntoCtrl from "../Controle/assuntoCtrl.js";

const rotaAssunto = new Router();
const ass = new AssuntoCtrl();

rotaAssunto
.get('/',ass.consultar)
.get('/:termo', ass.consultar)
.post('/',ass.gravar)
.patch('/',ass.atualizar)
.put('/',ass.atualizar)
.delete('/',ass.excluir);

export default rotaAssunto;