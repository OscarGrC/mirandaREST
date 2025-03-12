import { ContactSQLInterface } from "../interfaces/sqlInterfaces/ContactSQLInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { ContactModelMysql } from "../models/sql/contactSql";

export class ContactServiceMysql implements ServiceInterface<ContactSQLInterface> {

    async fetchAll(): Promise<ContactSQLInterface[]> {
        try {
            const contacts: ContactSQLInterface[] = await ContactModelMysql.findAll()
            return contacts
        }
        catch (error) {
            console.error('Error in fetchAll of contactService', error)
            throw error
        }
    }

    async fetchById(id: number): Promise<ContactSQLInterface | null> {
        try {
            const contact: ContactSQLInterface | null = await ContactModelMysql.findByPk(id)
            if (contact) return contact
            else throw new Error('Contact not found')
        }
        catch (error) {
            console.error('Error in fetchById of contactService', error)
            return null
        }
    }

    async create(contact: ContactSQLInterface): Promise<ContactSQLInterface> {
        try {
            const newContact: ContactSQLInterface = await ContactModelMysql.create({
                date: contact.date,
                asunto: contact.asunto,
                comment: contact.comment,
                customer_name: contact.customer_name,
                customer_lastname: contact.customer_lastname,
                customer_email: contact.customer_email,
                customer_phone: contact.customer_phone
            })
            return newContact
        }
        catch (error) {
            console.error('Error in create of contactService', error)
            throw error
        }
    }

    async update(id: number, contact: ContactSQLInterface): Promise<ContactSQLInterface | null> {
        try {
            const [updatedContact] = await ContactModelMysql.update(contact, { where: { id } })
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
