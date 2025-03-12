import { Puesto } from "../puestoEnum";

export interface UserSQLInterface {
    id?: number,
    photo: string;
    fullName: string;
    puesto: string;
    email: string;
    phone: string;
    startDate: string;
    description: string;
    stade: boolean;
    password: string;
}

