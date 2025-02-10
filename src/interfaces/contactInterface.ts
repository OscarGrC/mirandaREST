import { ContactCustomerInterface } from "./contactCustomerInterface";

export interface ContactInterface {
    date: string;
    id: number;
    customer: ContactCustomerInterface;
    asunto: string;
    comment: string;
}