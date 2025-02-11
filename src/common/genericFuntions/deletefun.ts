import { Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function DeleteFun<T>(service: ServiceInterface<T>, messageType: string) {
    return (req: Request, res: Response): void => {
        const deletedItem = service.delete(parseInt(req.params.id));

        if (deletedItem) {
            res.status(204).json({ message: `${messageType} deleted` });
        } else {
            res.status(404).json({ message: `${messageType} not found` });
        }
    };
}