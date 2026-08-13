import express, { request, response } from 'express';
// import db from '../../database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
//post user
export const criarUsuario = async (req, res) => {
    const { nome, acesso, email, senha, setor, cargo } = req.body;
    const criptSenha = await bcrypt.hash(senha, 8);
    const query = 'INSERT INTO usuarios (nome, acesso, email, senha, setor, cargo) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [nome, acesso, email, criptSenha, setor, cargo];
    try {
        await db.query(query, values);
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário!' });
        console.error(error);
    }
};
//put usuario
export const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE usuarios SET nome = $1, acesso = $2, email = $3, senha = $4, setor = $5, cargo = $6 WHERE id_usuario = $7';
    const values = [req.body.nome, req.body.acesso, req.body.email, req.body.senha, req.body.setor, req.body.cargo, id];
    try {
        await db.query(query, values);
        res.status(200).json({ message: `Usuário com ID ${id} atualizado com sucesso!` });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário!' });
        console.error(error);
    }
};
//delete usuario
export const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id_usuario = $1';
    const values = [id];
    try {
        await db.query(query, values);
        res.status(200).json({ message: `Usuário com ID ${id} deletado com sucesso!` });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário!' });
        console.error(error);
    }
};
//# sourceMappingURL=user.controller.js.map