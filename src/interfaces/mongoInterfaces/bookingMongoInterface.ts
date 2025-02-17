import { Document } from "mongoose";
import { CustomerMongoInterface } from "./customerMongoInterface";
import { RoomMongoInterface } from "./roomMongoInterface";

export interface BookingMongoInterface extends Document {
    guest: CustomerMongoInterface;
    order_date: string;
    check_in: string;
    check_out: string;
    room: Partial<RoomMongoInterface>
    special_request: string;
}

