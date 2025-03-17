import { UserSQLInterface } from '../interfaces/sqlInterfaces/UserSQLInterface';
import { UserInterface } from '../interfaces/userInterface';

export function toDefaultUser(userSQL: UserSQLInterface): UserInterface {
    return {
        id: userSQL.id?.toString() || "",
        photo: userSQL.photo,
        fullName: userSQL.fullName,
        puesto: userSQL.puesto,
        email: userSQL.email,
        phone: userSQL.phone,
        startDate: userSQL.startDate,
        description: userSQL.description,
        stade: userSQL.stade,
        password: userSQL.password
    };
}

export function toSQLUser(user: UserInterface): UserSQLInterface {
    return {
        id: Number(user.id),
        photo: user.photo,
        fullName: user.fullName,
        puesto: user.puesto,
        email: user.email,
        phone: user.phone,
        startDate: user.startDate,
        description: user.description,
        stade: user.stade,
        password: user.password
    };
}


