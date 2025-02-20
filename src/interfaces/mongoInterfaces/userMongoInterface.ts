import { Document } from "mongoose";
import { Puesto } from '../../interfaces/puestoEnum'

export interface UserMongoInterface extends Document {
    photo: string;
    fullName: string;
    puesto: Puesto;
    email: string;
    phone: string;
    startDate: string;
    description: string;
    stade: boolean;
    password: string;
}