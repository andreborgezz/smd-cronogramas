import {} from 'express';
import db from '../../database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
export const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const values = [email];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ message: 'credenciais inválidas' });
        }
        const token = jsonwebtoken.sign({ id_usuario: user.id_usuario, acesso: user.acesso }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.json({ mensagem: 'Login efetuado com sucesso', token });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login' });
        console.error(error);
    }
};
//# sourceMappingURL=auth.controller.js.map