import { Document } from "mongoose";

export interface RoomMongoInterface extends Document {
    number: string;
    type: string;
    amenities: number[];
    price: number;
    offert_price: number;
    offert: boolean;
    status: boolean;
    cancelation: string;
    description: string;
    photos: string[];
}