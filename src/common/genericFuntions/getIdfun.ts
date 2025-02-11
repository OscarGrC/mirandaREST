import { Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function GetIdFun<T>(service: ServiceInterface<T>, messageType: string) {
    return (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const data = service.fetchById(id);

        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: `${messageType} not found` });
        }
    };
}