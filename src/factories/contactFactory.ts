import { faker } from "@faker-js/faker";
import { ContactMongoInterface } from "../interfaces/mongoInterfaces/contactMongoInterface";
import { CustomerMongoInterface } from "../interfaces/mongoInterfaces/customerMongoInterface";

export class ContactFactory {

    private constructor() { }

    public static getInstance(): ContactFactory {
        if (!ContactFactory.instance) {
            ContactFactory.instance = new ContactFactory();
        }
        return ContactFactory.instance;
    }
    private static instance: ContactFactory;
    private subjects = [
        "Reserva no confirmada",
        "Problemas con la habitación",
        "Solicitud de reembolso",
        "Consulta sobre disponibilidad",
        "Servicios adicionales",
        "Problema con la facturación",
        "Experiencia en el restaurante",
        "Solicitud de cancelación",
        "Habitación sucia",
        "Atención al cliente deficiente"
    ];

    private comments = [
        "Hice mi reserva hace 3 días y aún no he recibido confirmación.",
        "El aire acondicionado en mi habitación no funciona correctamente.",
        "Me cobraron dos veces por mi reserva, necesito un reembolso.",
        "¿Tienen habitaciones disponibles para el próximo fin de semana?",
        "Quiero agregar desayuno a mi reserva, ¿es posible?",
        "La factura que me enviaron tiene un error en el monto total.",
        "La comida en el restaurante fue excelente, pero el servicio fue lento.",
        "Necesito cancelar mi reserva debido a una emergencia familiar.",
        "Al llegar, la habitación no estaba limpia y tuve que esperar.",
        "El personal de recepción no fue amable cuando llegamos."
    ];

    private randomDate(): string {
        const start = new Date(2023, 0, 1).getTime();
        const end = new Date().getTime();
        const randomTimestamp = faker.number.int({ min: start, max: end });
        return new Date(randomTimestamp).toISOString().replace("T", "TT").split(".")[0];
    }

    private createCustomer(): Partial<CustomerMongoInterface> {
        return {
            name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
        };
    }

    async create(): Promise<Partial<ContactMongoInterface>> {
        const randomIndex = faker.number.int({ min: 0, max: this.subjects.length - 1 });

        return {
            date: this.randomDate(),
            customer: this.createCustomer(),
            asunto: this.subjects[randomIndex],
            comment: this.comments[randomIndex],
        };
    }
}
