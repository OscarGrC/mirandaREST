import mongoose, { Schema } from "mongoose";
import { BookingMongoInterface } from "../interfaces/mongoInterfaces/bookingMongoInterface";

const BookingSchema = new Schema<BookingMongoInterface>({
    guest: {
        name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    order_date: { type: String, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    special_request: { type: String, required: true },
    room: {
        type: { type: String, required: true },
        number: { type: String, required: true },
    }
});

const BookingModel = mongoose.model<BookingMongoInterface>("Booking", BookingSchema);

export default BookingModel;