import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Router } from 'express';
import { UserValidator } from '../validators/userValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';

export const userRouter = Router();
const userService = new UserService();
const baseUrl = '/users'
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       204:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 *       404:
 *         description: Usuario no encontrado
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       204:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         photo:
 *           type: string
 *           example: "https://urlFoto.com"
 *         fullName:
 *           type: string
 *           example: "Oscar Gracia"
 *         puesto:
 *           type: string
 *           example: "Recepcionista"
 *         email:
 *           type: string
 *           example: "ejemplo@gmail.com"
 *         phone:
 *           type: string
 *           example: "+34 635317016"
 *         startDate:
 *           type: string
 *           example: "2025-01-31"
 *         description:
 *           type: string
 *           example: "Funciones que cumple nuestro empleado"
 *         stade:
 *           type: boolean
 *           example: true
 *         password:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.BllItoUQNU6-vhXLDI9JDUzDszW2htjB0q1RnM8SzSY"
 */

userRouter.get(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const usersList = userService.fetchAll();
    res.json(usersList);
});

userRouter.get(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const user = userService.fetchById(parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

userRouter.post(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const validation = UserValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const newuser = userService.create(req.body);
        res.status(201).json(newuser);
    }
});

userRouter.put(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const validation = UserValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const updateduser = userService.update(parseInt(req.params.id), req.body);
        if (updateduser !== null) {
            res.status(204).json(updateduser);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    }
});

userRouter.delete(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const deleteduser = userService.delete(parseInt(req.params.id));
    if (deleteduser) {
        res.status(204).json({ message: 'user deleted' });
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});