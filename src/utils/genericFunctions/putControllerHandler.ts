import { NextFunction, Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function PutFun<T>(service: ServiceInterface<T>, validator: any, messageType: string) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validation = validator.validate(req.body);

        if (!validation.valid) {
            res.status(400).json({ errors: validation.errors });
        }

        try {
            const updatedItem = await service.update(req.params.id, req.body);
            if (updatedItem) {
                res.status(200).json(updatedItem);
            } else {
                res.status(404).json({ message: `${messageType} not found` });
            }
        } catch (error) {
            next(error);
        }
    };
}