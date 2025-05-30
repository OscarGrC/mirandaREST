import { BookingServiceMongo } from '../services/bookingServiceMongo';
import { Router } from 'express';
import { BookingValidator } from '../validators/bookingValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { GetFun } from '../utils/genericFunctions/getControllerHandler';
import { GetIdFun } from '../utils/genericFunctions/getByIdControllerHandler';
import { PutFun } from '../utils/genericFunctions/putControllerHandler';
import { PostFun } from '../utils/genericFunctions/postControllerHandler';
import { DeleteFun } from '../utils/genericFunctions/deleteControllerHandler';

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Operaciones relacionadas con bookings
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Obtiene una lista de bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   guest:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Juan"
 *                       last_name:
 *                         type: string
 *                         example: "Pérez"
 *                       id:
 *                         type: integer
 *                         example: 12345
 *                   order_date:
 *                     type: string
 *                     example: "2024-02-10"
 *                   check_in:
 *                     type: string
 *                     example: "2024-02-15"
 *                   check_out:
 *                     type: string
 *                     example: "2024-02-20"
 *                   room:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "Deluxe"
 *                       number:
 *                         type: string
 *                         example: "R101"
 *                   special_request:
 *                     type: string
 *                     example: "Habitación cerca del ascensor"
 *   post:
 *     summary: Crea un nuevo booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking creado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 */

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   get:
 *     summary: Obtiene un booking por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del booking
 *     responses:
 *       200:
 *         description: Datos del booking encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking no encontrado
 *   put:
 *     summary: Actualiza un booking por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del booking a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       204:
 *         description: Booking actualizado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 *       404:
 *         description: Booking no encontrado
 *   delete:
 *     summary: Elimina un booking por ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del booking a eliminar
 *     responses:
 *       204:
 *         description: Booking eliminado correctamente
 *       404:
 *         description: Booking no encontrado
 */

export const bookingRouter = Router();
const service = new BookingServiceMongo();
const baseUrl: string = '/';

bookingRouter.get(baseUrl, authenticateJWT, GetFun(service));
bookingRouter.get(baseUrl + ':id', authenticateJWT, GetIdFun(service, "Booking"));
bookingRouter.post(baseUrl, authenticateJWT, PostFun(service, BookingValidator));
bookingRouter.put(baseUrl + ':id', authenticateJWT, PutFun(service, BookingValidator, "Booking"));
bookingRouter.delete(baseUrl + ':id', authenticateJWT, DeleteFun(service, "Booking"));


