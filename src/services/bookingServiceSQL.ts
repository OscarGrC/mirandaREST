import { BookingSQLInterface } from "../interfaces/sqlInterfaces/BookingSQLInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { BookingModelMysql } from "../models/sql/bookingSql";

export class BookingServiceSQL implements ServiceInterface<BookingSQLInterface> {
    async fetchAll(): Promise<BookingSQLInterface[]> {
        try {
            const bookings: BookingSQLInterface[] = await BookingModelMysql.findAll();
            return bookings;
        }
        catch (error) {
            console.error('Error in fetchAll of bookingService', error);
            throw error;
        }
    }

    async fetchById(id: number): Promise<BookingSQLInterface | null> {
        try {
            const booking: BookingSQLInterface | null = await BookingModelMysql.findByPk(id);
            if (booking !== null) return booking;
            else throw new Error('Booking not found');
        }
        catch (error) {
            console.error('Error in fetchById of bookingService', error);
            throw error;
        }
    }

    async create(booking: BookingSQLInterface): Promise<BookingSQLInterface> {
        try {
            const newBooking: BookingSQLInterface = await BookingModelMysql.create({
                guest_name: booking.guest_name,
                guest_lastname: booking.guest_lastname,
                guest_email: booking.guest_email,
                guest_phone: booking.guest_phone,
                order_date: booking.order_date,
                check_in: booking.check_in,
                check_out: booking.check_out,
                room_type: booking.room_type,
                room_number: booking.room_number,
                special_request: booking.special_request
            });

            return newBooking;
        }
        catch (error) {
            console.error('Error in create of bookingService', error);
            throw error;
        }
    }

    async update(id: number, booking: BookingSQLInterface): Promise<BookingSQLInterface | null> {
        try {
            const existingBooking: BookingSQLInterface | null = await this.fetchById(id);
            if (existingBooking == null) return null;

            const [updatedBooking] = await BookingModelMysql.update({
                guest_name: booking.guest_name,
                guest_lastname: booking.guest_lastname,
                guest_email: booking.guest_email,
                guest_phone: booking.guest_phone,
                order_date: booking.order_date,
                check_in: booking.check_in,
                check_out: booking.check_out,
                room_type: booking.room_type,
                room_number: booking.room_number,
                special_request: booking.special_request
            }, { where: { id } });

            if (updatedBooking === 0) return null;

            return await this.fetchById(id);
        }
        catch (error) {
            console.error('Error in update of bookingService', error);
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedBooking = await BookingModelMysql.destroy({ where: { id } });

            if (deletedBooking) return true;
            else return false;
        }
        catch (error) {
            console.error('Error in delete of bookingService', error);
            throw error;
        }
    }
}
