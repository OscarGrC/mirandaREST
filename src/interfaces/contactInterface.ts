import { ContactCustomerInterface } from "./contactCustomerInterface";

export interface ContactInterface {
    date: string;
    id: string;
    customer: ContactCustomerInterface;
    asunto: string;
    comment: string;
}