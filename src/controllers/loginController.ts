import { Request, Response, Router } from 'express';
import users from '../data/users.json';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInterface } from '../interfaces/userInterface';
import { signToken } from '../utils/token'

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "ejemplo@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Token JWT generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Usuario no encontrado o credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */


export const loginRouter = Router();

loginRouter.post('', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: UserInterface[] = users.filter(u => u.email === email);
    if (user.length === 0) {
        res.status(404).send('Usuario no encontrado');
    }
    const validPassword = bcrypt.compare(password, user[0].password).then((result) => {
        if (result === false) {
            res.status(400).send({ token: "Contraseña incorrecta" });
        }
        else {
            const token = signToken(email, password)
            res.status(200).send({ token: token });
        }
    });



}); 