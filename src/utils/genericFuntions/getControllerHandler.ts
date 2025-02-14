import { NextFunction, Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';

export function GetFun<T>(service: ServiceInterface<T>) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = service.fetchAll();
            res.json(data);
        } catch (error) {
            next(error);
        }
    };
}
