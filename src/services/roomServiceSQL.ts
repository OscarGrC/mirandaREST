import { RoomSQLInterface } from "../interfaces/sqlInterfaces/RoomSQLInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { RoomModelMysql } from "../models/sql/roomSql";
import { RoomInterface } from "../interfaces/roomInterface"
import { toDefaultRoom, toSQLRoom } from "../DTO/room"
import { RoomType } from "../interfaces/roomTypeEnum";

export class RoomServiceSQL implements ServiceInterface<RoomInterface> {
    async fetchAll(): Promise<RoomInterface[]> {
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
            return roomsParsed.map(room => toDefaultRoom(room));
        }
        catch (error) {
            console.error('Error in fetchAll of roomService', error);
            throw error;
        }
    }

    async fetchById(id: number): Promise<RoomInterface | null> {
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
                return toDefaultRoom(roomParsed);
            }
            else throw new Error('Room not found');
        }
        catch (error) {
            console.error('Error in fetchById of roomService', error);
            throw error;
        }
    }

    async create(room: RoomInterface): Promise<RoomInterface> {
        try {
            const sqlRoom: RoomSQLInterface = toSQLRoom(room);

            const newRoom: RoomSQLInterface = await RoomModelMysql.create(sqlRoom);

            return toDefaultRoom(newRoom);
        }
        catch (error) {
            console.error('Error in create of roomService', error);
            throw error;
        }
    }


    async update(id: number, room: RoomInterface): Promise<RoomInterface | null> {
        try {
            const existingRoom: RoomInterface | null = await this.fetchById(id);
            if (existingRoom == null) return null;

            const [updatedRoom] = await RoomModelMysql.update({
                number: room.number,
                type: Object.values(RoomType).includes(room.type as RoomType)
                    ? (room.type as RoomType)
                    : RoomType.SINGLE_BED,
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
    async fetchByDate(check_in: string, check_out: string): Promise<RoomSQLInterface[]> {
        return new Promise((resolve, reject) => {

            const rooms: RoomSQLInterface[] = [];
            resolve(rooms);
        });
    }
}
