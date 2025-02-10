import { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';
import { Router } from 'express';

export const bookingRouter = Router();
const bookingservice = new BookingService();
const baseUrl = '/bookings'
/**
 * @swagger
 * tags:
 *   - name: bookings
 *     description: Operaciones relacionadas con bookings
 */
/**
 * @swagger
 * /api/v1/bookings :
 *   get:
 *     summary: Obtiene una lista de bookings
 *     tags: [Bookings]
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
 *                     guest:
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
 */
bookingRouter.get(baseUrl, (req: Request, res: Response) => {
    const bookingsList = bookingservice.fetchAll();
    res.json(bookingsList);
});

bookingRouter.get(baseUrl + '/:id', (req: Request, res: Response) => {
    const booking = bookingservice.fetchById(parseInt(req.params.id));
    if (booking) {
        res.json(booking);
    } else {
        res.status(404).json({ message: 'booking not found' });
    }
});

bookingRouter.post(baseUrl, (req: Request, res: Response) => {
    const newbooking = bookingservice.create(req.body);
    res.status(201).json(newbooking);
});

bookingRouter.put(baseUrl + '/:id', (req: Request, res: Response) => {
    const updatedbooking = bookingservice.update(parseInt(req.params.id), req.body);
    if (updatedbooking !== null) {
        res.status(204).json(updatedbooking);
    } else {
        res.status(404).json({ message: 'booking not found' });
    }
});

bookingRouter.delete(baseUrl + '/:id', (req: Request, res: Response) => {
    const deletedbooking = bookingservice.delete(parseInt(req.params.id));
    if (deletedbooking) {
        res.status(204).json({ message: 'booking deleted' });
    } else {
        res.status(404).json({ message: 'booking not found' });
    }
});