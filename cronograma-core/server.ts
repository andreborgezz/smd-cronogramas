import express from 'express';

const app = express();
app.use(express.json());
const port = 3000;

app.get('/api', (req, res) => {
    res.json({ status: `Aplicação rodando na porta ${port}` });
});

app.listen(port, () => {
  console.log(`servidor rodando na porta: ${port}`);
});