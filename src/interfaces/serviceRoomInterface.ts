import { ServiceInterface } from "./serviceInterface";

export interface RoomServiceMongoInterface<RoomInterface> extends ServiceInterface<RoomInterface> {
    fetchByDate(check_in: string, check_out: string): Promise<RoomInterface[]>;
}