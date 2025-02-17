import { Document } from "mongoose";

export interface CustomerMongoInterface extends Document {
    name: string;
    last_name: string;
    email: string;
    phone: string;
}