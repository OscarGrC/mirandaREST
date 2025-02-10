import { ContactInterface } from "../interfaces/contactInterface";
import contactArchivedData from "../data/contactArchived.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class contactArchivedsArchivedervice implements ServiceInterface<ContactInterface> {
    private contactArchivedsArchived: ContactInterface[] = contactArchivedData as ContactInterface[];

    fetchAll(): ContactInterface[] {
        return this.contactArchivedsArchived;
    }

    fetchById(id: number): ContactInterface | undefined {
        return this.contactArchivedsArchived.find((contactArchived) => contactArchived.id === id);
    }

    create(contactArchived: ContactInterface): ContactInterface {
        const newcontactArchived = { ...contactArchived, id: this.contactArchivedsArchived.length + 1 };
        this.contactArchivedsArchived.push(newcontactArchived);
        return newcontactArchived;
    }

    update(id: number, contactArchived: ContactInterface): ContactInterface | null {
        const contactArchivedToUpdate = this.contactArchivedsArchived.filter((contactArchived) => contactArchived.id === id);
        if (contactArchivedToUpdate.length > 0) {
            const updatedcontactArchived = { ...contactArchivedToUpdate[0], ...contactArchived };
            const finalList = this.contactArchivedsArchived.filter((contactArchived) => contactArchived.id !== id);
            finalList.push(updatedcontactArchived);
            this.contactArchivedsArchived = finalList;
            return updatedcontactArchived;
        }
        return null;
    }

    delete(id: number): boolean {
        const contactArchivedToDelete = this.contactArchivedsArchived.filter((contactArchived) => contactArchived.id === id);
        if (contactArchivedToDelete.length > 0) {
            this.contactArchivedsArchived = this.contactArchivedsArchived.filter((contactArchived) => contactArchived.id !== id);
            return true;
        }
        return false;
    }
}