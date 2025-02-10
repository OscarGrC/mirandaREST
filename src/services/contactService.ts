import { ContactInterface } from "../interfaces/contactInterface";
import contactData from "../data/contact.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class ContactService implements ServiceInterface<ContactInterface> {
    private contact: ContactInterface[] = contactData as ContactInterface[];

    fetchAll(): ContactInterface[] {
        return this.contact;
    }

    fetchById(id: number): ContactInterface | undefined {
        return this.contact.find((contact) => contact.id === id);
    }

    create(contact: ContactInterface): ContactInterface {
        const newcontact = { ...contact, id: this.contact.length + 1 };
        this.contact.push(newcontact);
        return newcontact;
    }

    update(id: number, contact: ContactInterface): ContactInterface | null {
        const contactToUpdate = this.contact.filter((contactArchived) => contactArchived.id === id);
        if (contactToUpdate.length > 0) {
            const updatedcontact = { ...contactToUpdate[0], ...contact };
            const finalList = this.contact.filter((contact) => contact.id !== id);
            finalList.push(updatedcontact);
            this.contact = finalList;
            return updatedcontact;
        }
        return null;
    }

    delete(id: number): boolean {
        const contactToDelete = this.contact.filter((contact) => contact.id === id);
        if (contactToDelete.length > 0) {
            this.contact = this.contact.filter((contact) => contact.id !== id);
            return true;
        }
        return false;
    }
}