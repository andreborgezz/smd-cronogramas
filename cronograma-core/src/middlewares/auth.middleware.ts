import { type Request, type Response, type NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export function autenticar(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as {
            id: number;
            email: string;
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}