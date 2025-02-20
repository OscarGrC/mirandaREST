import ContactModel from "../models/Contact";
import { ContactMongoInterface } from "../interfaces/mongoInterfaces/contactMongoInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class ContactArchivedService implements ServiceInterface<ContactMongoInterface> {

    async fetchAll(): Promise<ContactMongoInterface[]> {
        return await ContactModel.find();
    }

    async fetchById(id: string): Promise<ContactMongoInterface | null> {
        return await ContactModel.findById(id);
    }

    async create(contact: ContactMongoInterface): Promise<ContactMongoInterface> {
        const newContact = new ContactModel(contact);
        return await newContact.save();
    }

    async update(id: string, contact: Partial<ContactMongoInterface>): Promise<ContactMongoInterface | null> {
        return await ContactModel.findByIdAndUpdate(id, contact, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const deletedContact = await ContactModel.findByIdAndDelete(id);
        return !!deletedContact;
    }
}
