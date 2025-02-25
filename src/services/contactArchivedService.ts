import ContactArchivedModel from "../models/contactArchived";
import { ContactMongoInterface } from "../interfaces/mongoInterfaces/contactMongoInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class ContactArchivedService implements ServiceInterface<ContactMongoInterface> {

    async fetchAll(): Promise<ContactMongoInterface[]> {
        return await ContactArchivedModel.find();
    }

    async fetchById(id: string): Promise<ContactMongoInterface | null> {
        return await ContactArchivedModel.findById(id);
    }

    async create(contact: ContactMongoInterface): Promise<ContactMongoInterface> {
        const newContact = new ContactArchivedModel(contact);
        return await newContact.save();
    }

    async update(id: string, contact: Partial<ContactMongoInterface>): Promise<ContactMongoInterface | null> {
        return await ContactArchivedModel.findByIdAndUpdate(id, contact, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const deletedContact = await ContactArchivedModel.findByIdAndDelete(id);
        return !!deletedContact;
    }
}
