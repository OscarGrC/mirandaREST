import { Document } from "mongoose";

export interface UserMongoInterface extends Document {
    photo: string;
    fullName: string;
    puesto: string;
    email: string;
    phone: string;
    startDate: string;
    description: string;
    stade: boolean;
    password: string;
}