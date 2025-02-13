import { ServiceInterface } from "./serviceInterface";

export interface RoomServiceInterface<RoomInterface> extends ServiceInterface<RoomInterface> {
    fetchByDate(check_in: string, check_out: string): RoomInterface[];
}