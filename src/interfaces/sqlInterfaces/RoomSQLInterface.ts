import { RoomType } from "../roomTypeEnum"
export interface RoomSQLInterface {
    id?: number,
    number: string;
    type: RoomType;
    amenities: string;
    price: number;
    offert_price: number;
    offert: boolean;
    status: boolean;
    cancelation: string;
    description: string;
    photos: string;
}

