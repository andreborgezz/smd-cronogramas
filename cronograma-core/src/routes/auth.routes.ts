import { Router } from 'express';
import { loginUsuario } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post('/login', loginUsuario);

export default authRoutes;
