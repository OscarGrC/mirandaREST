import { NextFunction, Request, Response } from 'express';
import { RoomServiceMongoInterface } from '../../interfaces/serviceRoomInterface';

export function GetByDates<T>(service: RoomServiceMongoInterface<T>) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { check_in, check_out } = req.body;
            if (!check_in || !check_out) {
                res.status(400).json({ message: "Faltan parámetros: check_in y check_out son requeridos" });
            }
            const checkInStr = check_in.toString();
            const checkOutStr = check_out.toString();
            // Obtener habitaciones disponibles
            const availableRooms = await service.fetchByDate(checkInStr, checkOutStr);

            res.json(availableRooms);
        } catch (error) {
            next(error);
        }
    };
}


