import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
        res.status(500).json({ message: 'Token secret no está configurado en el entorno' });
    }

    try {
        const decoded = jwt.verify(token!, secret!);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};
