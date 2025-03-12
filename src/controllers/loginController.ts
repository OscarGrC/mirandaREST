import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { UserServiceSQL } from '../services/userServiceSQL';
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

loginRouter.post('', async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const service = new UserServiceSQL();

    try {
        const users = await service.fetchAll();
        const foundUser = users.find(u => u.email === email);
        console.log(foundUser)
        if (!foundUser) {
            return res.status(404).send('Usuario no encontrado');
        }

        const validPassword = await bcrypt.compare(password, foundUser.password);
        if (!validPassword) {
            return res.status(400).send('Contraseña incorrecta');
        }
        const user = { name: foundUser.fullName, email: foundUser.email }
        const token = signToken(foundUser.email, foundUser.password);
        return res.status(200).send({ token, user });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error en el servidor');
    }
});
