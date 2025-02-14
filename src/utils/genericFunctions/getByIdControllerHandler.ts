import { NextFunction, Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function GetIdFun<T>(service: ServiceInterface<T>, messageType: string) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = parseInt(req.params.id);
        try {
            const data = await service.fetchById(id);
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: `${messageType} not found` });
            }
        } catch (error) {
            next(error);
        }
    };
}