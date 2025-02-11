import { Request, Response } from 'express';
import { ServiceInterface } from '../../interfaces/serviceInterface';
export function GetFun<T>(service: ServiceInterface<T>) {
    return (req: Request, res: Response) => {
        const data = service.fetchAll();
        res.json(data);
    };
}

