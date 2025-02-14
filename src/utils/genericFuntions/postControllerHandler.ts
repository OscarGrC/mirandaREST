import { NextFunction, Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function PostFun<T>(service: ServiceInterface<T>, validator: any) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const validation = validator.validate(req.body);

        if (!validation.valid) {
            res.status(400).json({ errors: validation.errors });
        }

        try {
            const newItem = await service.create(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    };
}