import { ContactSQLInterface } from "../interfaces/sqlInterfaces/ContactSQLInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { ContactModelMysql } from "../models/sql/contactSql";
import { ContactInterface } from "../interfaces/contactInterface";
import { toDefaultContact, toSQLContact } from "../DTO/contact";

export class ContactServiceMysql implements ServiceInterface<ContactInterface> {

    async fetchAll(): Promise<ContactInterface[]> {
        try {
            const contacts: ContactSQLInterface[] = await ContactModelMysql.findAll()
            return contacts.map(contact => toDefaultContact(contact));
        }
        catch (error) {
            console.error('Error in fetchAll of contactService', error)
            throw error
        }
    }

    async fetchById(id: number): Promise<ContactInterface | null> {
        try {
            const contact: ContactSQLInterface | null = await ContactModelMysql.findByPk(id)
            if (contact) {
                return toDefaultContact(contact)
            }
            else throw new Error('Contact not found')
        }
        catch (error) {
            console.error('Error in fetchById of contactService', error)
            return null
        }
    }

    async create(contact: ContactInterface): Promise<ContactInterface> {
        try {
            const newContact: ContactSQLInterface = await ContactModelMysql.create({
                date: contact.date,
                asunto: contact.asunto,
                comment: contact.comment,
                customer_name: contact.customer.name,
                customer_lastname: contact.customer.last_name,
                customer_email: contact.customer.email,
                customer_phone: contact.customer.phone
            })
            return toDefaultContact(newContact)
        }
        catch (error) {
            console.error('Error in create of contactService', error)
            throw error
        }
    }

    async update(id: number, contact: ContactInterface): Promise<ContactInterface | null> {
        try {
            const [updatedContact] = await ContactModelMysql.update(toSQLContact(contact), { where: { id } })
            if (updatedContact === 0) return null

            return await this.fetchById(id)
        }
        catch (error) {
            console.error('Error in update of contactService', error)
            throw error
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedContact = await ContactModelMysql.destroy({ where: { id } })

            if (deletedContact) return true
            else return false
        }
        catch (error) {
            console.error('Error in delete of contactService', error)
            throw error
        }
    }
}
