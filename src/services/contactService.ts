import { ContactInterface } from "../interfaces/contactInterface";
import contactArchivedData from "../data/contactArchived.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class contactArchivedservice implements ServiceInterface<ContactInterface> {
    private contactArchiveds: ContactInterface[] = contactArchivedData as ContactInterface[];

    fetchAll(): ContactInterface[] {
        return this.contactArchiveds;
    }

    fetchById(id: number): ContactInterface | undefined {
        return this.contactArchiveds.find((contactArchived) => contactArchived.id === id);
    }

    create(contactArchived: ContactInterface): ContactInterface {
        const newcontactArchived = { ...contactArchived, id: this.contactArchiveds.length + 1 };
        this.contactArchiveds.push(newcontactArchived);
        return newcontactArchived;
    }

    update(id: number, contactArchived: ContactInterface): ContactInterface | null {
        const contactArchivedToUpdate = this.contactArchiveds.filter((contactArchived) => contactArchived.id === id);
        if (contactArchivedToUpdate.length > 0) {
            const updatedcontactArchived = { ...contactArchivedToUpdate[0], ...contactArchived };
            const finalList = this.contactArchiveds.filter((contactArchived) => contactArchived.id !== id);
            finalList.push(updatedcontactArchived);
            this.contactArchiveds = finalList;
            return updatedcontactArchived;
        }
        return null;
    }

    delete(id: number): boolean {
        const contactArchivedToDelete = this.contactArchiveds.filter((contactArchived) => contactArchived.id === id);
        if (contactArchivedToDelete.length > 0) {
            this.contactArchiveds = this.contactArchiveds.filter((contactArchived) => contactArchived.id !== id);
            return true;
        }
        return false;
    }
}