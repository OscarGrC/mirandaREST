import mongoose, { Schema } from "mongoose";
import { RoomMongoInterface } from '../interfaces/mongoInterfaces/roomMongoInterface'

const RoomSchema = new Schema<RoomMongoInterface>({
    number: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    amenities: { type: [Number], required: true },
    price: { type: Number, required: true },
    offert_price: { type: Number, required: false },
    offert: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    cancelation: { type: String, required: true },
    description: { type: String, required: true },
    photos: { type: [String], required: true },
});

const RoomModel = mongoose.model<RoomMongoInterface>("Room", RoomSchema);

export default RoomModel;