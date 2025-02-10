import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Router } from 'express';

export const userRouter = Router();
const userService = new UserService();
const baseUrl = '/users'
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con users
 */
/**
 * @swagger
 * /api/v1/users :
 *   get:
 *     summary: Obtiene una lista de users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   photo:
 *                     type: string
 *                     example: https://urlFoto.com
 *                   fullName:
 *                     type: string
 *                     example: Oscar Gracia 
 *                   puesto:
 *                     type: string
 *                     example: Recepcionista
 *                   email:
 *                     type: string
 *                     example: ejemplo@gmail.com
 *                  phone:
 *                     type: string
 *                     example: +34 635317016 
 *                   starDate:
 *                     type: string
 *                     example: 2025-01-31
 *                   description:
 *                     type: string
 *                     example: funciones que cumple nuestro empleado 
 *                    stade:
 *                     type: boolean
 *                     example: True
 *                   password:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.BllItoUQNU6-vhXLDI9JDUzDszW2htjB0q1RnM8SzSY
 * 
 */
userRouter.get(baseUrl, (req: Request, res: Response) => {
    const usersList = userService.fetchAll();
    res.json(usersList);
});

userRouter.get(baseUrl + '/:id', (req: Request, res: Response) => {
    const user = userService.fetchById(parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

userRouter.post(baseUrl, (req: Request, res: Response) => {
    const newuser = userService.create(req.body);
    res.status(201).json(newuser);
});

userRouter.put(baseUrl + '/:id', (req: Request, res: Response) => {
    const updateduser = userService.update(parseInt(req.params.id), req.body);
    if (updateduser !== null) {
        res.status(204).json(updateduser);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

userRouter.delete(baseUrl + '/:id', (req: Request, res: Response) => {
    const deleteduser = userService.delete(parseInt(req.params.id));
    if (deleteduser) {
        res.status(204).json({ message: 'user deleted' });
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});