import { RoomMongoInterface } from "../interfaces/mongoInterfaces/roomMongoInterface";
import { faker } from "@faker-js/faker";
import { RoomType } from "../interfaces/roomTypeEnum";

export class RoomFactory {
    private constructor() { }

    public static getInstance(): RoomFactory {
        if (!RoomFactory.instance) {
            RoomFactory.instance = new RoomFactory();
        }
        return RoomFactory.instance;
    }

    private static instance: RoomFactory;
    private static lastRoomNumber = 100;

    private descriptions: Record<RoomType, string> = {
        [RoomType.SUITE]: "Una lujosa suite con todas las comodidades y vista panorámica.",
        [RoomType.DOUBLE_BED]: "Habitación con dos camas individuales, ideal para amigos o compañeros de viaje.",
        [RoomType.SINGLE_BED]: "Una habitación acogedora con una sola cama, perfecta para viajeros solitarios.",
        [RoomType.DOUBLE_SUPERIOR]: "Espaciosa habitación doble con comodidades premium y decoración moderna."
    };

    private getNextRoomNumber(): string {
        RoomFactory.lastRoomNumber++;

        const floor = Math.floor(RoomFactory.lastRoomNumber / 100);
        const room = RoomFactory.lastRoomNumber % 100;

        if (room > 20) { // Máximo 20 habitaciones por piso
            RoomFactory.lastRoomNumber = (floor + 1) * 100 + 1;
        }

        return `R${RoomFactory.lastRoomNumber}`;
    }

    async create(): Promise<Partial<RoomMongoInterface>> {
        const roomType = faker.helpers.arrayElement(Object.values(RoomType));

        return {
            number: this.getNextRoomNumber(),
            type: roomType,
            amenities: [1, ...faker.helpers.arrayElements([2, 3, 4, 5, 6, 7, 8, 9, 10], faker.number.int({ min: 3, max: 6 }))],
            price: faker.number.int({ min: 2000, max: 120000 }),
            offert_price: faker.number.int({ min: 1, max: 80 }),
            offert: faker.datatype.boolean(),
            status: faker.datatype.boolean(),
            cancelation: faker.helpers.arrayElement(["Se admite cancelacion", "No se admite cancelacion"]),
            description: this.descriptions[roomType],
            photos: [
                "/assets/img/room1a.jpg",
                "/assets/img/room1b.jpg",
                "/assets/img/room1c.jpg"
            ],
        };
    }
}
