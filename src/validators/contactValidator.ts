import { ContactInterface } from "../interfaces/contactInterface";

export class ContactValidator {
    static validate(contact: ContactInterface): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!contact.id || contact.id <= 0) {
            errors.push("El ID del contacto debe ser un número positivo.");
        }

        if (!contact.customer.name || contact.customer.name.trim() === "") {
            errors.push("El nombre del cliente no puede estar vacío.");
        }
        if (!contact.customer.last_name || contact.customer.last_name.trim() === "") {
            errors.push("El apellido del cliente no puede estar vacío.");
        }

        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}TT([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        if (!dateRegex.test(contact.date)) {
            errors.push("La fecha debe tener el formato 'YYYY-MM-DD'.");
        }

        if (!contact.asunto || contact.asunto.trim().length < 3 || contact.asunto.trim().length > 100) {
            errors.push("El asunto debe tener entre 3 y 100 caracteres.");
        }

        if (!contact.comment || contact.comment.trim().length < 10 || contact.comment.trim().length > 1000) {
            errors.push("El comentario debe tener entre 10 y 1000 caracteres.");
        }

        return {
            valid: errors.length === 0,
            errors: errors,
        };
    }
}
