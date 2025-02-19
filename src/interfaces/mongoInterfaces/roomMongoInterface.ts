import { Document } from "mongoose";
import { RoomType } from "../roomTypeEnum"

export interface RoomMongoInterface extends Document {
    number: string;
    type: RoomType;
    amenities: number[];
    price: number;
    offert_price: number;
    offert: boolean;
    status: boolean;
    cancelation: string;
    description: string;
    photos: string[];
}