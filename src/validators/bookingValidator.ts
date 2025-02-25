import { BookingInterface } from "../interfaces/bookingInterface";

export class BookingValidator {
    static validate(booking: BookingInterface): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!booking.guest || !booking.guest.name || !booking.guest.last_name) {
            errors.push("El huésped debe tener un nombre y apellido.");
        }



        if (!booking.room || !booking.room.type || !booking.room.number) {
            errors.push("La habitación debe tener un tipo y un número válidos.");
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(booking.check_in) || !dateRegex.test(booking.check_out)) {
            errors.push("Las fechas deben tener el formato 'YYYY-MM-DD'.");
        }

        const orderDate = new Date(booking.order_date);
        const checkInDate = new Date(booking.check_in);
        const checkOutDate = new Date(booking.check_out);

        if (checkInDate >= checkOutDate) {
            errors.push("La fecha de check-in debe ser anterior a la fecha de check-out.");
        }

        if (orderDate > checkInDate) {
            errors.push("La fecha de orden no puede ser posterior a la fecha de check-in.");
        }

        if (typeof booking.room.number !== "string" || booking.room.number.trim() === "") {
            errors.push("El número de habitación debe ser un string válido.");
        }

        if (typeof booking.room.type !== "string" || booking.room.type.trim() === "") {
            errors.push("El tipo de habitación debe ser un string válido.");
        }

        if (booking.special_request && booking.special_request.length > 500) {
            errors.push("La solicitud especial no puede exceder los 500 caracteres.");
        }

        return {
            valid: errors.length === 0,
            errors: errors,
        };
    }
}
