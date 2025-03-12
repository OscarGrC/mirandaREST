import { RoomSQLInterface } from "../interfaces/sqlInterfaces/RoomSQLInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { RoomModelMysql } from "../models/sql/roomSql";

export class RoomServiceSQL implements ServiceInterface<RoomSQLInterface> {
    async fetchAll(): Promise<RoomSQLInterface[]> {
        try {
            const rooms: RoomSQLInterface[] = await RoomModelMysql.findAll();
            const roomsParsed = rooms.map(room => ({
                id: room.id,
                number: room.number,
                type: room.type,
                amenities: typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities,
                price: room.price,
                offert_price: room.offert_price,
                offert: room.offert,
                status: room.status,
                cancelation: room.cancelation,
                description: room.description,
                photos: JSON.stringify(room.photos),
            }));
            return roomsParsed;
        }
        catch (error) {
            console.error('Error in fetchAll of roomService', error);
            throw error;
        }
    }

    async fetchById(id: number): Promise<RoomSQLInterface | null> {
        try {
            const room: RoomSQLInterface | null = await RoomModelMysql.findByPk(id);
            if (room !== null) {
                const roomParsed = {
                    id: room.id,
                    number: room.number,
                    type: room.type,
                    amenities: typeof room.amenities === 'string' ? JSON.parse(room.amenities) : room.amenities,
                    price: room.price,
                    offert_price: room.offert_price,
                    offert: room.offert,
                    status: room.status,
                    cancelation: room.cancelation,
                    description: room.description,
                    photos: JSON.stringify(room.photos)
                };
                return roomParsed;
            }
            else throw new Error('Room not found');
        }
        catch (error) {
            console.error('Error in fetchById of roomService', error);
            throw error;
        }
    }

    async create(room: RoomSQLInterface): Promise<RoomSQLInterface> {
        try {
            const newRoom: RoomSQLInterface = await RoomModelMysql.create({
                number: room.number,
                type: room.type,
                amenities: typeof room.amenities === 'string' ? room.amenities : JSON.stringify(room.amenities),
                price: room.price,
                offert_price: room.offert_price,
                offert: room.offert,
                status: room.status,
                cancelation: room.cancelation,
                description: room.description,
                photos: JSON.stringify(room.photos)
            });

            return newRoom;
        }
        catch (error) {
            console.error('Error in create of roomService', error);
            throw error;
        }
    }

    async update(id: number, room: RoomSQLInterface): Promise<RoomSQLInterface | null> {
        try {
            const existingRoom: RoomSQLInterface | null = await this.fetchById(id);
            if (existingRoom == null) return null;

            const [updatedRoom] = await RoomModelMysql.update({
                number: room.number,
                type: room.type,
                amenities: typeof room.amenities === 'string' ? room.amenities : JSON.stringify(room.amenities),
                price: room.price,
                offert_price: room.offert_price,
                offert: room.offert,
                status: room.status,
                cancelation: room.cancelation,
                description: room.description,
                photos: JSON.stringify(room.photos) // Esto puede reventar si no esta aun en json 
            }, { where: { id } });

            if (updatedRoom === 0) return null;

            return await this.fetchById(id);
        }
        catch (error) {
            console.error('Error in update of roomService', error);
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedRoom = await RoomModelMysql.destroy({ where: { id } });

            if (deletedRoom) return true;
            else return false;
        }
        catch (error) {
            console.error('Error in delete of roomService', error);
            throw error;
        }
    }
}
