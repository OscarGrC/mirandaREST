import { Request, Response } from 'express';
import { RoomService } from '../services/roomService';
import { Router } from 'express';
import { RoomValidator } from '../validators/roomValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';

export const roomRouter = Router();
const roomservice = new RoomService();
const baseUrl = '/rooms'
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
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         room_number:
 *           type: string
 *           example: "R001"
 *         room_type:
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

roomRouter.get(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const roomsList = roomservice.fetchAll();
    res.json(roomsList);
});

roomRouter.get(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const room = roomservice.fetchById(parseInt(req.params.id));
    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ message: 'room not found' });
    }
});

roomRouter.post(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const validation = RoomValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const newroom = roomservice.create(req.body);
        res.status(201).json(newroom);
    }
});

roomRouter.put(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const validation = RoomValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const updatedroom = roomservice.update(parseInt(req.params.id), req.body);
        if (updatedroom !== null) {
            res.status(204).json(updatedroom);
        } else {
            res.status(404).json({ message: 'room not found' });
        }
    }
});

roomRouter.delete(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const deletedroom = roomservice.delete(parseInt(req.params.id));
    if (deletedroom) {
        res.status(204).json({ message: 'room deleted' });
    } else {
        res.status(404).json({ message: 'room not found' });
    }
});