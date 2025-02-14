export interface RoomInterface {
    id: number;
    number: string;
    type: string;
    amenities: number[];
    price: number;
    offert_price: number;
    offert: boolean;
    status: boolean;
    cancelation: string;
    description: string;
    photos: string[];
}