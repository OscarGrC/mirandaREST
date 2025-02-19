import { faker } from "@faker-js/faker";
import { BookingMongoInterface } from "../interfaces/mongoInterfaces/bookingMongoInterface";
import { CustomerMongoInterface } from "../interfaces/mongoInterfaces/customerMongoInterface";
import { RoomType } from "../interfaces/roomTypeEnum"
import { RoomMongoInterface } from "../interfaces/mongoInterfaces/roomMongoInterface";

export class BookingFactory {
    private constructor() { }

    public static getInstance(): BookingFactory {
        if (!BookingFactory.instance) {
            BookingFactory.instance = new BookingFactory();
        }
        return BookingFactory.instance;
    }
    private static instance: BookingFactory;
    private lastRoomNumber = 101;
    private specialRequests = [
        "Cama extra en la habitación",
        "Vista al mar si es posible",
        "Habitación en un piso alto",
        "Desayuno sin gluten",
        "Llegada tarde, después de medianoche",
        "Salida tardía a las 15:00",
        "Habitación lejos del ascensor",
        "Almohadas extra en la cama",
        "Mini bar sin alcohol",
        "Decoración especial por aniversario"
    ];



    private generateRoom(): Partial<RoomMongoInterface> {
        const type: RoomType = faker.helpers.arrayElement(Object.values(RoomType));

        let roomNumber = `R${this.lastRoomNumber}`;
        if (this.lastRoomNumber % 100 === 20) {
            this.lastRoomNumber += 81;
        } else {
            this.lastRoomNumber++;
        }

        return { type: type as RoomType, number: roomNumber };
    }


    private randomDateRange(): { order_date: string; check_in: string; check_out: string } {
        const today = new Date();
        const checkInDate = new Date(today);
        checkInDate.setDate(today.getDate() + faker.number.int({ min: 0, max: 60 })); // Check-in entre hoy y 60 días

        const orderDate = new Date(checkInDate);
        orderDate.setDate(checkInDate.getDate() - faker.number.int({ min: 0, max: 30 })); // Pedido hasta 30 días antes

        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + faker.number.int({ min: 1, max: 14 })); // Check-out 1-14 días después

        return {
            order_date: orderDate.toISOString().split("T")[0],
            check_in: checkInDate.toISOString().split("T")[0],
            check_out: checkOutDate.toISOString().split("T")[0]
        };
    }

    private createCustomer(): Partial<CustomerMongoInterface> {
        return {
            name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
        };
    }

    async create(): Promise<Partial<BookingMongoInterface>> {
        const { order_date, check_in, check_out } = this.randomDateRange();
        return {
            guest: this.createCustomer(),
            order_date,
            check_in,
            check_out,
            room: this.generateRoom(),
            special_request: faker.helpers.arrayElement(this.specialRequests),
        };
    }
}
