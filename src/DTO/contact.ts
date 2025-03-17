import { ContactSQLInterface } from '../interfaces/sqlInterfaces/ContactSQLInterface';
import { ContactInterface } from '../interfaces/contactInterface';

export function toDefaultContact(contactSQL: ContactSQLInterface): ContactInterface {
    return {
        id: contactSQL.id?.toString() || "",
        date: contactSQL.date,
        asunto: contactSQL.asunto,
        comment: contactSQL.comment,
        customer: {
            name: contactSQL.customer_name,
            last_name: contactSQL.customer_lastname,
            email: contactSQL.customer_email,
            phone: contactSQL.customer_phone
        }
    };
}

export function toSQLContact(contact: ContactInterface): ContactSQLInterface {
    return {
        id: Number(contact.id),
        date: contact.date,
        asunto: contact.asunto,
        comment: contact.comment,
        customer_name: contact.customer.name,
        customer_lastname: contact.customer.last_name,
        customer_email: contact.customer.email,
        customer_phone: contact.customer.phone
    };
}