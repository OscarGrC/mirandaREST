import { BookingInterface } from "../interfaces/bookingInterface";
import bookingData from "../data/booking.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class BookingService implements ServiceInterface<BookingInterface> {
    private bookings: BookingInterface[] = bookingData as BookingInterface[];

    fetchAll(): BookingInterface[] {
        return this.bookings;
    }

    fetchById(id: number): BookingInterface | undefined {
        return this.bookings.find((booking) => booking.guest.id === id);
    }

    create(booking: BookingInterface): BookingInterface {
        const newBooking = { ...booking, id: this.bookings.length + 1 };
        this.bookings.push(newBooking);
        return newBooking;
    }

    update(id: number, booking: BookingInterface): BookingInterface | null {
        const bookingToUpdate = this.bookings.filter((booking) => booking.guest.id === id);
        if (bookingToUpdate.length > 0) {
            const updatedbooking = { ...bookingToUpdate[0], ...booking };
            const finalList = this.bookings.filter((booking) => booking.guest.id !== id);
            finalList.push(updatedbooking);
            this.bookings = finalList;
            return updatedbooking;
        }
        return null;
    }

    delete(id: number): boolean {
        const bookingToDelete = this.bookings.filter((booking) => booking.guest.id === id);
        if (bookingToDelete.length > 0) {
            this.bookings = this.bookings.filter((booking) => booking.guest.id !== id);
            return true;
        }
        return false;
    }
}