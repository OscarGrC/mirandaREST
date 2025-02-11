import { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';
import { Router } from 'express';
import { BookingValidator } from '../validators/bookingValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';

export const bookingRouter = Router();
const bookingservice = new BookingService();
const baseUrl: string = '/bookings';
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

bookingRouter.get(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const bookingsList = bookingservice.fetchAll();
    res.json(bookingsList);
});

bookingRouter.get(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const booking = bookingservice.fetchById(parseInt(req.params.id));
    if (booking) {
        res.json(booking);
    } else {
        res.status(404).json({ message: 'booking not found' });
    }
});

bookingRouter.post(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const validation = BookingValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const newbooking = bookingservice.create(req.body);
        res.status(201).json(newbooking);
    }
});

bookingRouter.put(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const validation = BookingValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const updatedbooking = bookingservice.update(parseInt(req.params.id), req.body);
        if (updatedbooking !== null) {
            res.status(204).json(updatedbooking);
        } else {
            res.status(404).json({ message: 'booking not found' });
        }
    }
});

bookingRouter.delete(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const deletedbooking = bookingservice.delete(parseInt(req.params.id));
    if (deletedbooking) {
        res.status(204).json({ message: 'booking deleted' });
    } else {
        res.status(404).json({ message: 'booking not found' });
    }
});