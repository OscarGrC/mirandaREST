import { RoomSQLInterface } from '../interfaces/sqlInterfaces/RoomSQLInterface';
import { RoomInterface } from '../interfaces/roomInterface';
import { RoomType } from '../interfaces/roomTypeEnum';


export function toDefaultRoom(roomSQL: RoomSQLInterface): RoomInterface {

    return {
        id: roomSQL.id?.toString() || "",
        number: roomSQL.number,
        price: roomSQL.price,
        offert_price: roomSQL.offert_price,
        offert: roomSQL.offert,
        status: roomSQL.status,
        cancelation: roomSQL.cancelation,
        description: roomSQL.description,
        type: roomSQL.type,
        amenities: typeof roomSQL.amenities === "string"
            ? JSON.parse(roomSQL.amenities) as number[]
            : roomSQL.amenities,
        photos: typeof roomSQL.photos === "string"
            ? JSON.parse(roomSQL.photos) as string[]
            : roomSQL.photos
    };
}

export function toSQLRoom(room: RoomInterface): RoomSQLInterface {
    let roomType: RoomType;
    switch (room.type) {
        case "Suite":
            roomType = RoomType.SUITE;
            break;
        case "Double Bed":
            roomType = RoomType.DOUBLE_BED;
            break;
        case "Single Bed":
            roomType = RoomType.SINGLE_BED;
            break;
        case "Double Superior":
            roomType = RoomType.DOUBLE_SUPERIOR;
            break;
        default:
            roomType = RoomType.SINGLE_BED;
    }
    return {
        id: Number(room.id),
        number: room.number,
        price: room.price,
        offert_price: room.offert_price,
        offert: room.offert,
        status: room.status,
        cancelation: room.cancelation,
        description: room.description,
        type: roomType,
        amenities: JSON.stringify(room.amenities),
        photos: JSON.stringify(room.photos)
    };
}

