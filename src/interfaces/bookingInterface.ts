import { RoomInterface } from "./roomInterface";

export interface BookingInterface {
    guest: {
        name: string;
        last_name: string;
        id: number;
    };
    order_date: string;
    check_in: string;
    check_out: string;
    room: Partial<RoomInterface>
    special_request?: string;
}