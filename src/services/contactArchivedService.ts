import { ContactInterface } from "../interfaces/contactInterface";
import contactArchivedData from "../data/contactArchived.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class ContactArchivedService implements ServiceInterface<ContactInterface> {
    private contactArchived: ContactInterface[] = contactArchivedData as ContactInterface[];

    fetchAll(): ContactInterface[] {
        return this.contactArchived;
    }

    fetchById(id: number): ContactInterface | undefined {
        return this.contactArchived.find((contactArchived) => contactArchived.id === id);
    }

    create(contactArchived: ContactInterface): ContactInterface {
        const newcontactArchived = { ...contactArchived, id: this.contactArchived.length + 1 };
        this.contactArchived.push(newcontactArchived);
        return newcontactArchived;
    }

    update(id: number, contactArchived: ContactInterface): ContactInterface | null {
        const contactArchivedToUpdate = this.contactArchived.filter((contactArchived) => contactArchived.id === id);
        if (contactArchivedToUpdate.length > 0) {
            const updatedcontactArchived = { ...contactArchivedToUpdate[0], ...contactArchived };
            const finalList = this.contactArchived.filter((contactArchived) => contactArchived.id !== id);
            finalList.push(updatedcontactArchived);
            this.contactArchived = finalList;
            return updatedcontactArchived;
        }
        return null;
    }

    delete(id: number): boolean {
        const contactArchivedToDelete = this.contactArchived.filter((contactArchived) => contactArchived.id === id);
        if (contactArchivedToDelete.length > 0) {
            this.contactArchived = this.contactArchived.filter((contactArchived) => contactArchived.id !== id);
            return true;
        }
        return false;
    }
}