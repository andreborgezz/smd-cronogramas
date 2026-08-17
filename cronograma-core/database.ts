import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const db = new Pool ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export async function checarConexaoBanco(): Promise<void> {
    try {
      const client = await db.connect();
      console.log('🚀 Banco de dados conectado com sucesso!');
      client.release();
    } catch (error) {
      console.error('❌ Erro: Banco de dados NÃO conectado!', error);
    }
  }

