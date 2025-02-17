import { Document } from "mongoose";
import { CustomerMongoInterface } from "./customerMongoInterface";

export interface ContactMongoInterface extends Document {
    date: string;
    customer: CustomerMongoInterface;
    asunto: string;
    comment: string;
}