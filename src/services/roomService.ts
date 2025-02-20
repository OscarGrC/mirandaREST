import RoomModel from "../models/Room";
import { RoomMongoInterface } from "../interfaces/mongoInterfaces/roomMongoInterface";
import { RoomServiceInterface } from "../interfaces/serviceRoomInterface";

export class RoomService implements RoomServiceInterface<RoomMongoInterface> {

    async fetchAll(): Promise<RoomMongoInterface[]> {
        return await RoomModel.find();
    }

    async fetchById(id: string): Promise<RoomMongoInterface | null> {
        return await RoomModel.findById(id);
    }

    async fetchByDate(checkIn: string, checkOut: string): Promise<RoomMongoInterface[]> {
        const parseDate = (date: string): Date => {
            const [day, month, year] = date.split('/').map(Number);
            return new Date(year, month - 1, day);
        };
        const checkInDate = parseDate(checkIn);
        const checkOutDate = parseDate(checkOut);

        const bookedRooms = await RoomModel.find({
            $or: [
                { check_in: { $lte: checkOutDate }, check_out: { $gte: checkInDate } }
            ]
        });

        const bookedRoomIds = bookedRooms.map(room => room.id);

        return await RoomModel.find({ _id: { $nin: bookedRoomIds } });
    }

    async create(room: RoomMongoInterface): Promise<RoomMongoInterface> {
        const newRoom = new RoomModel(room);
        return await newRoom.save();
    }

    async update(id: string, room: Partial<RoomMongoInterface>): Promise<RoomMongoInterface | null> {
        return await RoomModel.findByIdAndUpdate(id, room, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const deletedRoom = await RoomModel.findByIdAndDelete(id);
        return !!deletedRoom;
    }
}
