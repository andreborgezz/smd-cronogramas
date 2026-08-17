import express, { type Request, type Response } from 'express';
import { db } from '../../database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

//post user
export const criarUsuario = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const id = uuidv4();
    const criptSenha = await bcrypt.hash(password, 8);
    const query = 'INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())';
    const values = [id, name, email, criptSenha];
    try {
        await db.query(query, values);
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário!' });
        console.error(error);
    }
};

export const atualizarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const criptSenha = password ? await bcrypt.hash(password, 8) : null;
    const query = 'UPDATE users SET name = $1, email = $2, password = COALESCE($3, password), updated_at = NOW() WHERE id = $4';
    const values = [name, email, criptSenha, id];
    try {
        await db.query(query, values);
        res.status(200).json({ message: `Usuário com ID ${id} atualizado com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário!' });
        console.error(error);
    }
};

export const deletarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    try {
        await db.query(query, values);
        res.status(200).json({ message: `Usuário com ID ${id} deletado com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário!' });
        console.error(error);
    }
};