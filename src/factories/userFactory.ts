import { UserMongoInterface } from "../interfaces/mongoInterfaces/userMongoInterface";
import { generateHash } from "../utils/token";
import { faker } from "@faker-js/faker";
import { Puesto } from "../interfaces/puestoEnum";

export class UserFactory {
    private constructor() { }

    public static getInstance(): UserFactory {
        if (!UserFactory.instance) {
            UserFactory.instance = new UserFactory();
        }
        return UserFactory.instance;
    }
    private static instance: UserFactory;
    private domains = ["gmail.com", "yahoo.com", "hotmail.com"];
    private positions = Object.values(Puesto);



    private randomDateWithinLastMonth(): string {
        const today = new Date();
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - faker.number.int({ min: 1, max: 30 }));
        return pastDate.toISOString().split("T")[0];
    }

    async create(): Promise<Partial<UserMongoInterface>> {
        const name = faker.person.firstName();
        const lastName = faker.person.lastName();
        const fullName = `${name} ${lastName}`;
        const email = `${name.toLowerCase()}.${lastName.toLowerCase()}@${faker.helpers.arrayElement(this.domains)}`;
        const password = "password123";
        const hashedPassword = await generateHash(password);

        return {
            photo: "/assets/img/employ1.jpg",
            fullName,
            puesto: faker.helpers.arrayElement(this.positions),
            email,
            phone: faker.phone.number(),
            startDate: this.randomDateWithinLastMonth(),
            description: faker.lorem.sentence(),
            stade: faker.datatype.boolean(),
            password: hashedPassword,
        };
    }
}

