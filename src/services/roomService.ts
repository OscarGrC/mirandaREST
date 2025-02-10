import { RoomInterface } from "../interfaces/roomInterface";
import roomsData from "../data/rooms.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class RoomService implements ServiceInterface<RoomInterface> {
    private rooms: RoomInterface[] = roomsData as RoomInterface[];

    fetchAll(): RoomInterface[] {
        return this.rooms;
    }

    fetchById(id: number): RoomInterface | undefined {
        return this.rooms.find((room) => room.id === id);
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