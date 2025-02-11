import { Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function PutFun<T>(service: ServiceInterface<T>, validator: any, messageType: string) {
    return (req: Request, res: Response) => {
        const validation = validator.validate(req.body);
        if (!validation.valid) {
            res.status(400).json({ errors: validation.errors });
        }
        const updatedItem = service.update(parseInt(req.params.id), req.body);

        if (updatedItem !== null) {
            res.status(204).json(updatedItem);
        } else {
            res.status(404).json({ message: `${messageType} not found` });
        }
    };
}
