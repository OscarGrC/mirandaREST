import { Request, Response } from 'express';
import { RoomService } from '../services/roomService';
import { Router } from 'express';
import { RoomValidator } from '../validators/roomValidator';

export const roomRouter = Router();
const roomservice = new RoomService();
const baseUrl = '/rooms'
/**
 * @swagger
 * tags:
 *   - name: rooms
 *     description: Operaciones relacionadas con rooms
 */
/**
 * @swagger
 * /api/v1/rooms :
 *   get:
 *     summary: Obtiene una lista de rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Lista de rooms
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
 *                   room_number:
 *                     type: string
 *                     example: "R001"
 *                   room_type:
 *                     type: string
 *                     example: "Suit"
 *                   amenities:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     example: [1,2,3,4,5,8]
 *                   price:
 *                     type: integer
 *                     example: 9999
 *                   offert_price:
 *                     type: integer
 *                     example: 8999
 *                   offert:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: boolean
 *                     example: true
 *                   cancelation:
 *                     type: string
 *                     example: "No reembolsable"
 *                   description:
 *                     type: string
 *                     example: "Suit con vistas a la piscina"
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["https://urlfoto1.com", "https://urlfoto2.com", "https://urlfoto3.com"]
 */
roomRouter.get(baseUrl, (req: Request, res: Response) => {
    const roomsList = roomservice.fetchAll();
    res.json(roomsList);
});

roomRouter.get(baseUrl + '/:id', (req: Request, res: Response) => {
    const room = roomservice.fetchById(parseInt(req.params.id));
    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ message: 'room not found' });
    }
});

roomRouter.post(baseUrl, (req: Request, res: Response) => {
    const validation = RoomValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const newroom = roomservice.create(req.body);
        res.status(201).json(newroom);
    }
});

roomRouter.put(baseUrl + '/:id', (req: Request, res: Response) => {
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

roomRouter.delete(baseUrl + '/:id', (req: Request, res: Response) => {
    const deletedroom = roomservice.delete(parseInt(req.params.id));
    if (deletedroom) {
        res.status(204).json({ message: 'room deleted' });
    } else {
        res.status(404).json({ message: 'room not found' });
    }
});