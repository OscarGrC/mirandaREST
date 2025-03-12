import BookingModel from "../models/Booking";
import { BookingMongoInterface } from "../interfaces/mongoInterfaces/bookingMongoInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class BookingServiceMongo implements ServiceInterface<BookingMongoInterface> {

    async fetchAll(): Promise<BookingMongoInterface[]> {
        return await BookingModel.find();
    }

    async fetchById(id: string): Promise<BookingMongoInterface | null> {
        return await BookingModel.findById(id);
    }

    async create(booking: BookingMongoInterface): Promise<BookingMongoInterface> {
        const newBooking = new BookingModel(booking);
        return await newBooking.save();
    }

    async update(id: string, booking: Partial<BookingMongoInterface>): Promise<BookingMongoInterface | null> {
        return await BookingModel.findByIdAndUpdate(id, booking, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const deletedBooking = await BookingModel.findByIdAndDelete(id);
        return !!deletedBooking;
    }
}
