import { BookingSQLInterface } from "../interfaces/sqlInterfaces/BookingSQLInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { BookingModelMysql } from "../models/sql/bookingSql";
import { BookingInterface } from "../interfaces/bookingInterface"
import { toDefaultBooking, toSQLBooking } from "../DTO/booking"

export class BookingServiceSQL implements ServiceInterface<BookingInterface> {
    async fetchAll(): Promise<BookingInterface[]> {
        try {
            const bookings: BookingSQLInterface[] = await BookingModelMysql.findAll();
            return bookings.map(booking => toDefaultBooking(booking));
        }
        catch (error) {
            console.error('Error in fetchAll of bookingService', error);
            throw error;
        }
    }

    async fetchById(id: number): Promise<BookingInterface | null> {
        try {
            const booking: BookingSQLInterface | null = await BookingModelMysql.findByPk(id);
            if (booking !== null) return toDefaultBooking(booking);
            else throw new Error('Booking not found');
        }
        catch (error) {
            console.error('Error in fetchById of bookingService', error);
            throw error;
        }
    }

    async create(booking: BookingInterface): Promise<BookingInterface> {
        try {
            const sqlBooking: BookingSQLInterface = toSQLBooking(booking);
            const newBooking: BookingSQLInterface = await BookingModelMysql.create({
                guest_name: sqlBooking.guest_name,
                guest_lastname: sqlBooking.guest_lastname,
                guest_email: sqlBooking.guest_email,
                guest_phone: sqlBooking.guest_phone,
                order_date: sqlBooking.order_date,
                check_in: sqlBooking.check_in,
                check_out: sqlBooking.check_out,
                room_type: sqlBooking.room_type,
                room_number: sqlBooking.room_number,
                special_request: sqlBooking.special_request
            });

            return toDefaultBooking(newBooking);
        }
        catch (error) {
            console.error('Error in create of bookingService', error);
            throw error;
        }
    }

    async update(id: number, booking: BookingInterface): Promise<BookingInterface | null> {
        try {
            const existingBooking: BookingInterface | null = await this.fetchById(id);
            if (existingBooking == null) return null;

            const sqlBooking: BookingSQLInterface = toSQLBooking(booking);

            const [updatedBooking] = await BookingModelMysql.update({
                guest_name: sqlBooking.guest_name,
                guest_lastname: sqlBooking.guest_lastname,
                guest_email: sqlBooking.guest_email,
                guest_phone: sqlBooking.guest_phone,
                order_date: sqlBooking.order_date,
                check_in: sqlBooking.check_in,
                check_out: sqlBooking.check_out,
                room_type: sqlBooking.room_type,
                room_number: sqlBooking.room_number,
                special_request: sqlBooking.special_request
            }, { where: { id } });

            if (updatedBooking === 0) return null;

            return await this.fetchById(id);
        } catch (error) {
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
