import { BookingInterface } from "../interfaces/bookingInterface";
import bookingData from "../data/booking.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class bokingservice implements ServiceInterface<BookingInterface> {
    private bokings: BookingInterface[] = bookingData as BookingInterface[];

    fetchAll(): BookingInterface[] {
        return this.bokings;
    }

    fetchById(id: number): BookingInterface | undefined {
        return this.bokings.find((boking) => boking.guest.id === id);
    }

    create(boking: BookingInterface): BookingInterface {
        const newBooking = { ...boking, id: this.bokings.length + 1 };
        this.bokings.push(newBooking);
        return newBooking;
    }

    update(id: number, boking: BookingInterface): BookingInterface | null {
        const bokingToUpdate = this.bokings.filter((boking) => boking.guest.id === id);
        if (bokingToUpdate.length > 0) {
            const updatedboking = { ...bokingToUpdate[0], ...boking };
            const finalList = this.bokings.filter((boking) => boking.guest.id !== id);
            finalList.push(updatedboking);
            this.bokings = finalList;
            return updatedboking;
        }
        return null;
    }

    delete(id: number): boolean {
        const bokingToDelete = this.bokings.filter((boking) => boking.guest.id === id);
        if (bokingToDelete.length > 0) {
            this.bokings = this.bokings.filter((boking) => boking.guest.id !== id);
            return true;
        }
        return false;
    }
}