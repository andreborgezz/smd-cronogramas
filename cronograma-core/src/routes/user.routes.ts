import { Router } from 'express';
import { criarUsuario, atualizarUsuario, deletarUsuario } from '../controllers/user.controller.js';
import { autenticar } from '../middlewares/auth.middleware.js';

const usuarioRoutes = Router();

usuarioRoutes.post('/user', criarUsuario);
usuarioRoutes.put('/user/:id', autenticar, atualizarUsuario);
usuarioRoutes.delete('/user/:id', autenticar, deletarUsuario);

export default usuarioRoutes;