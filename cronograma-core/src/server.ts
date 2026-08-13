import express  from 'express';

const app = express();
app.use(express.json());
const port = 3000;

app.use('/api', (req, res) => {
    res.json({ message: 'endpoint da api funcionando' });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});