import express from 'express';
import { checarConexaoBanco } from './database.js';
import { DatabaseError } from 'pg';
import usuarioRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
app.use(express.json());
const port = 3000;
const db_port = 5432;

app.get('/api', (req, res) => {
    res.json({ status: `Aplicação rodando na porta ${port}` });
});

app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`servidor rodando na porta: ${port}`);
});

checarConexaoBanco();