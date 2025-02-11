import { Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function PostFun<T>(service: ServiceInterface<T>, validator: any) {
    return (req: Request, res: Response) => {
        const validation = validator.validate(req.body);

        if (!validation.valid) {
            res.status(400).json({ errors: validation.errors });
        } else {
            const newItem = service.create(req.body);
            res.status(201).json(newItem);
        }
    };
}
