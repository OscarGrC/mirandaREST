import { RoomInterface } from "../interfaces/roomInterface";
import roomsData from "../data/rooms.json";
import bookingData from "../data/booking.json";
import { RoomServiceInterface } from "../interfaces/serviceRoomInterface";
import { BookingInterface } from "../interfaces/bookingInterface";

export class RoomService implements RoomServiceInterface<RoomInterface> {
    private rooms: RoomInterface[] = roomsData as RoomInterface[];
    private bookings: BookingInterface[] = bookingData as BookingInterface[];

    fetchAll(): RoomInterface[] {
        return this.rooms;
    }

    fetchById(id: number): RoomInterface | undefined {
        return this.rooms.find((room) => room.id === id);
    }
    fetchByDate(checkIn: string, checkOut: string): RoomInterface[] {
        // Convertir fechas de "DD/MM/AAAA" a "AAAA/MM/DD"
        const parseDate = (date: string): Date => {
            const [day, month, year] = date.split('/').map(Number);
            return new Date(year, month - 1, day);
        };
        const checkInDate = parseDate(checkIn);
        const checkOutDate = parseDate(checkOut);

        // Filtrar reservas 
        const bookedRoomIds = this.bookings
            .filter(booking => {
                const bookingCheckIn = parseDate(booking.check_in);
                const bookingCheckOut = parseDate(booking.check_out);

                return (
                    (bookingCheckIn <= checkOutDate && bookingCheckOut >= checkInDate)
                );
            })
            .map(booking => booking.room.number); // Extraemos las rooms

        // Filtrar habitaciones disponibles
        const availableRooms = this.rooms.filter(room => !bookedRoomIds.includes(room.number));
        return availableRooms;
    }


    create(room: RoomInterface): RoomInterface {
        const newRoom = { ...room, id: this.rooms.length + 1 };
        this.rooms.push(newRoom);
        return newRoom;
    }

    update(id: number, room: RoomInterface): RoomInterface | null {
        const roomToUpdate = this.rooms.filter((room) => room.id === id);
        if (roomToUpdate.length > 0) {
            const updatedroom = { ...roomToUpdate[0], ...room };
            const finalList = this.rooms.filter((room) => room.id !== id);
            finalList.push(updatedroom);
            this.rooms = finalList;
            return updatedroom;
        }
        return null;
    }

    delete(id: number): boolean {
        const roomToDelete = this.rooms.filter((room) => room.id === id);
        if (roomToDelete.length > 0) {
            this.rooms = this.rooms.filter((room) => room.id !== id);
            return true;
        }
        return false;
    }
}