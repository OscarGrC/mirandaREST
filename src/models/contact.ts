import mongoose, { Schema } from "mongoose";
import { ContactMongoInterface } from "../interfaces/mongoInterfaces/contactMongoInterface";

const ContactSchema = new Schema<ContactMongoInterface>({
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

const ContactModel = mongoose.model<ContactMongoInterface>("Contact", ContactSchema);

export default ContactModel;
