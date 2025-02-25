import { UserInterface } from "../interfaces/userInterface";

export class UserValidator {
    static validate(user: UserInterface): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        /*
           const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
           if (!user.photo || !urlRegex.test(user.photo)) {
               errors.push("La foto debe ser una URL válida en formato jpg, png, jpeg, gif o webp.");
           }
   */

        if (!user.fullName || user.fullName.trim().length < 5) {
            errors.push("El nombre completo debe tener al menos 5 caracteres.");
        }

        if (!user.puesto || user.puesto.trim() === "") {
            errors.push("El puesto no puede estar vacío.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email || !emailRegex.test(user.email)) {
            errors.push("El email debe ser válido.");
        }

        const phoneRegex = /^\d{7,15}$/;
        if (!user.phone || !phoneRegex.test(user.phone)) {
            errors.push("El teléfono debe contener solo números y tener entre 7 y 15 dígitos.");
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!user.startDate || !dateRegex.test(user.startDate)) {
            errors.push("La fecha de inicio debe estar en formato YYYY-MM-DD.");
        } else {
            const date = new Date(user.startDate);
            if (isNaN(date.getTime())) {
                errors.push("La fecha de inicio no es una fecha válida.");
            }
        }

        if (!user.description || user.description.trim().length < 10 || user.description.trim().length > 500) {
            errors.push("La descripción debe tener entre 10 y 500 caracteres.");
        }

        if (typeof user.stade !== "boolean") {
            errors.push("El estado (stade) debe ser un booleano.");
        }

        if (user.password.length == 0) {
            errors.push("La contraseña esta vacia");
        }

        return {
            valid: errors.length === 0,
            errors: errors,
        };
    }
}
