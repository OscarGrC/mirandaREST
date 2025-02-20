import { NextFunction, Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function DeleteFun<T>(service: ServiceInterface<T>, messageType: string) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deletedItem = await service.delete(req.params.id);

            if (deletedItem) {
                res.status(200).json({ message: `${messageType} deleted` });
            } else {
                res.status(404).json({ message: `${messageType} not found` });
            }
        } catch (error) {
            next(error);
        }
    };
}