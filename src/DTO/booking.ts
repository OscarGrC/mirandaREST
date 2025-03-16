import { BookingSQLInterface } from '../interfaces/sqlInterfaces/BookingSQLInterface';
import { BookingInterface } from '../interfaces/bookingInterface';
import { RoomType } from '../interfaces/roomTypeEnum';

export function toDefaultBooking(bookingSQL: BookingSQLInterface): BookingInterface {
    let roomType: RoomType;
    switch (bookingSQL.room_type) {
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
        guest: {
            name: bookingSQL.guest_name,
            last_name: bookingSQL.guest_lastname,
            id: Number(bookingSQL.guest_phone),
        },
        order_date: bookingSQL.order_date,
        check_in: bookingSQL.check_in,
        check_out: bookingSQL.check_out,
        room: {
            type: roomType,
            number: bookingSQL.room_number,
        },
        special_request: bookingSQL.special_request,
    };
}

export function toSQLBooking(booking: BookingInterface): BookingSQLInterface {
    return {
        guest_name: booking.guest.name,
        guest_lastname: booking.guest.last_name,
        guest_email: "Ejemplo@email.com",
        guest_phone: "635317016",
        order_date: booking.order_date,
        check_in: booking.check_in,
        check_out: booking.check_out,
        room_type: booking.room.type || "",
        room_number: booking.room.number || "R100",
        special_request: booking.special_request || ''
    };
}

