import { RoomInterface } from "../interfaces/roomInterface";

export class RoomValidator {
    static validate(room: RoomInterface): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!room.id || room.id <= 0) {
            errors.push("El ID de la habitación debe ser un número positivo.");
        }
        if (!room.room_number || room.room_number.trim() === "") {
            errors.push("El número de habitación no puede estar vacío.");
        }
        if (!room.room_type || room.room_type.trim() === "") {
            errors.push("El tipo de habitación no puede estar vacío.");
        }
        if (!Array.isArray(room.amenities) || room.amenities.some(a => typeof a !== "number" || a <= 0)) {
            errors.push("Las amenidades deben ser un array de números positivos.");
        }
        if (!room.price || room.price <= 0) {
            errors.push("El precio debe ser un número positivo mayor a 0.");
        }
        if (room.offert_price < 0 || room.offert_price >= room.price) {
            errors.push("El precio de oferta debe ser menor que el precio normal y positivo.");
        }
        if (typeof room.offert !== "boolean") {
            errors.push("El valor de oferta (offert) debe ser un booleano.");
        }
        if (typeof room.status !== "boolean") {
            errors.push("El estado (status) debe ser un booleano.");
        }
        if (!room.cancelation || room.cancelation.trim() === "") {
            errors.push("La política de cancelación no puede estar vacía.");
        }
        if (!room.description || room.description.trim().length < 10 || room.description.trim().length > 500) {
            errors.push("La descripción debe tener entre 10 y 500 caracteres.");
        }

        /*
                const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
                if (!Array.isArray(room.photos) || room.photos.length === 0 || room.photos.some(photo => !urlRegex.test(photo))) {
                    errors.push("Debe haber al menos una foto válida en formato URL (jpg, png, jpeg, gif, webp).");
                }
        */
        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
