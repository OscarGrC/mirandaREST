import { Request, Response, Router } from 'express';
import users from '../data/users.json';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInterface } from '../interfaces/userInterface';

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
    // console.log(req.body);
    const { email, password } = req.body;

    const user: UserInterface[] = users.filter(u => u.email === email);
    if (user.length === 0) {
        res.status(400).send('Usuario no encontrado');
    }
    if (!process.env.TOKEN_SECRET) {
        res.status(500).send('Error del servidor: TOKEN_SECRET no está definido');
    }

    const validPassword = bcrypt.compare(password, user[0].password).then((result) => {
        // console.log(result);
        if (!result === false) {
            res.status(400).send({ token: "USuario o contraseña incorrectos" });
            return;
        }
        else {
            const token = jwt.sign({ email: user[0].email }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });
            res.status(200).send({ token: token });
        }
    });



}); 