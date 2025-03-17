import { RoomServiceSQL } from '../services/roomServiceSQL';
import { NextFunction, Router } from 'express';
import { RoomValidator } from '../validators/roomValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { GetFun } from '../utils/genericFunctions/getControllerHandler';
import { GetIdFun } from '../utils/genericFunctions/getByIdControllerHandler';
import { PutFun } from '../utils/genericFunctions/putControllerHandler';
import { PostFun } from '../utils/genericFunctions/postControllerHandler';
import { DeleteFun } from '../utils/genericFunctions/deleteControllerHandler';
import { GetByDates } from '../utils/genericFunctions/getByDatesControllerHandler';

/**
 * @swagger
 * tags:
 *   - name: Rooms
 *     description: Operaciones relacionadas con las habitaciones
 */

/**
 * @swagger
 * /api/v1/rooms:
 *   get:
 *     summary: Obtiene una lista de habitaciones
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Lista de habitaciones disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *   post:
 *     summary: Crea una nueva habitación
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Habitación creada correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 */

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *   get:
 *     summary: Obtiene una habitación por ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habitación
 *     responses:
 *       200:
 *         description: Datos de la habitación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Habitación no encontrada
 *   put:
 *     summary: Actualiza una habitación por ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habitación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       204:
 *         description: Habitación actualizada correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 *       404:
 *         description: Habitación no encontrada
 *   delete:
 *     summary: Elimina una habitación por ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habitación a eliminar
 *     responses:
 *       204:
 *         description: Habitación eliminada correctamente
 *       404:
 *         description: Habitación no encontrada
 */

/**
 * @swagger
 * /api/v1/rooms/filter:
 *   post:
 *     summary: Filtra habitaciones disponibles según fechas
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               check_in:
 *                 type: string
 *                 format: date
 *                 example: "13/10/2025"
 *               check_out:
 *                 type: string
 *                 format: date
 *                 example: "26/10/2025"
 *     responses:
 *       200:
 *         description: Lista de habitaciones disponibles en el rango de fechas proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: Faltan parámetros en la solicitud
 *       401:
 *         description: No autorizado, token no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         number:
 *           type: string
 *           example: "R001"
 *         type:
 *           type: string
 *           example: "Suite"
 *         amenities:
 *           type: array
 *           items:
 *             type: integer
 *           example: [1,2,3,4,5,8]
 *         price:
 *           type: integer
 *           example: 9999
 *         offert_price:
 *           type: integer
 *           example: 8999
 *         offert:
 *           type: boolean
 *           example: true
 *         status:
 *           type: boolean
 *           example: true
 *         cancelation:
 *           type: string
 *           example: "No reembolsable"
 *         description:
 *           type: string
 *           example: "Suite con vistas a la piscina"
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://urlfoto1.com", "https://urlfoto2.com", "https://urlfoto3.com"]
 */
export const roomRouter = Router();
const service = new RoomServiceSQL();

roomRouter.get("/", authenticateJWT, GetFun(service));
roomRouter.get("/:id", authenticateJWT, GetIdFun(service, "Room"));
roomRouter.post("/", authenticateJWT, PostFun(service, RoomValidator));
roomRouter.put("/:id", authenticateJWT, PutFun(service, RoomValidator, "Room"));
roomRouter.delete("/:id", authenticateJWT, DeleteFun(service, "Room"));

//roomRouter.post("/filter", authenticateJWT, GetByDates(service));