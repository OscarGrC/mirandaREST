import UserModel from "../models/User";
import { UserMongoInterface } from "../interfaces/mongoInterfaces/userMongoInterface";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class UserService implements ServiceInterface<UserMongoInterface> {

    async fetchAll(): Promise<UserMongoInterface[]> {
        return await UserModel.find();
    }

    async fetchById(id: string): Promise<UserMongoInterface | null> {
        return await UserModel.findById(id);
    }

    async create(user: UserMongoInterface): Promise<UserMongoInterface> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async update(id: string, user: Partial<UserMongoInterface>): Promise<UserMongoInterface | null> {
        return await UserModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return !!deletedUser;
    }
}
