import mongoose, { Schema } from "mongoose";
import { ContactMongoInterface } from "../interfaces/mongoInterfaces/contactMongoInterface";

const ContactArchivedSchema = new Schema<ContactMongoInterface>({
    date: { type: String, required: true },
    customer: {
        name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    asunto: { type: String, required: true },
    comment: { type: String, required: true },
});

const ContactArchivedModel = mongoose.model<ContactMongoInterface>("ContactArchived", ContactArchivedSchema);

export default ContactArchivedModel;
