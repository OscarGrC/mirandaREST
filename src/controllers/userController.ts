import { UserService } from '../services/userService';
import { Router } from 'express';
import { UserValidator } from '../validators/userValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { GetFun } from '../utils/genericFuntions/getControllerHandler';
import { GetIdFun } from '../utils/genericFuntions/getByIdControllerHandler';
import { PutFun } from '../utils/genericFuntions/putControllerHandler';
import { PostFun } from '../utils/genericFuntions/postControllerHandler';
import { DeleteFun } from '../utils/genericFuntions/deleteControllerHandler';

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
 *     security:
 *       - bearerAuth: [] 
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
 *     security:
 *       - bearerAuth: [] 
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
 *     security:
 *       - bearerAuth: [] 
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
 *     security:
 *       - bearerAuth: [] 
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

export const userRouter = Router();
const userService = new UserService();
const baseUrl = ''

userRouter.get(baseUrl, authenticateJWT, GetFun(userService));
userRouter.get(baseUrl + '/:id', authenticateJWT, GetIdFun(userService, "User"));
userRouter.post(baseUrl, authenticateJWT, PostFun(userService, UserValidator))
userRouter.put(baseUrl + '/:id', authenticateJWT, PutFun(userService, UserValidator, "User"))
userRouter.delete(baseUrl + '/:id', authenticateJWT, DeleteFun(userService, "User"))
