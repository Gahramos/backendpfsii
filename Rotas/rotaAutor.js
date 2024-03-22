import { Router } from "express";
import AutorCtrl from "../Controle/autorCtrl.js";

const autCtrl = new AutorCtrl();
const rotaAutor = new Router();

rotaAutor
.get('/',autCtrl.consultar)
.get('/:termo', autCtrl.consultar)
.post('/',autCtrl.gravar)
.patch('/',autCtrl.atualizar)
.put('/',autCtrl.atualizar)
.delete('/',autCtrl.excluir);

export default rotaAutor;