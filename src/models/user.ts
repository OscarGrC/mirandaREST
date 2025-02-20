import mongoose, { Schema } from "mongoose";
import { UserMongoInterface } from '../interfaces/mongoInterfaces/userMongoInterface'

const UserSchema = new Schema<UserMongoInterface>({
    photo: { type: String, required: true },
    fullName: { type: String, required: true, unique: true },
    puesto: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    startDate: { type: String, required: true },
    description: { type: String, required: true },
    stade: { type: Boolean, default: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<UserMongoInterface>("User", UserSchema);

export default UserModel;
