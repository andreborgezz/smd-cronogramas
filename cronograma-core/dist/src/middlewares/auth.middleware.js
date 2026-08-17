import {} from 'express';
import jsonwebtoken from 'jsonwebtoken';
//verifica se estaá logado e se o token é valido, ja que ele reseta a cada 12h
export function autenticar(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}
;
//# sourceMappingURL=auth.middleware.js.map