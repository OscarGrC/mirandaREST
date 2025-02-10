import { UserInterface } from "../interfaces/userInterface";
import usersData from "../data/users.json";
import { ServiceInterface } from "../interfaces/serviceInterface";

export class UserService implements ServiceInterface<UserInterface> {
    private users: UserInterface[] = usersData as UserInterface[];

    fetchAll(): UserInterface[] {
        return this.users;
    }

    fetchById(id: number): UserInterface | undefined {
        return this.users.find((user) => user.id === id);
    }

    create(user: UserInterface): UserInterface {
        const newUser = { ...user, id: this.users.length + 1 };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, user: UserInterface): UserInterface | null {
        const userToUpdate = this.users.filter((user) => user.id === id);
        if (userToUpdate.length > 0) {
            const updateduser = { ...userToUpdate[0], ...user };
            const finalList = this.users.filter((user) => user.id !== id);
            finalList.push(updateduser);
            this.users = finalList;
            return updateduser;
        }
        return null;
    }

    delete(id: number): boolean {
        const userToDelete = this.users.filter((user) => user.id === id);
        if (userToDelete.length > 0) {
            this.users = this.users.filter((user) => user.id !== id);
            return true;
        }
        return false;
    }
}