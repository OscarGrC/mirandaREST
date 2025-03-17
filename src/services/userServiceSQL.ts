
import { UserSQLInterface } from "../interfaces/sqlInterfaces/UserSQLInterface";
import { UserModelMysql } from "../models/sql/userSql";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { generateHash } from "../utils/token";
import { UserInterface } from "../interfaces/userInterface"
import { toDefaultUser, toSQLUser } from "../DTO/user"

export class UserServiceSQL implements ServiceInterface<UserInterface> {



    async fetchAll(): Promise<UserInterface[]> {
        try {
            const users: UserSQLInterface[] = await UserModelMysql.findAll()
            return users.map(user => toDefaultUser(user));
        }
        catch (error) {
            console.error('Error in fetchAll of userService', error)
            throw error
        }
    }

    async fetchById(id: number): Promise<UserInterface | null> {
        try {
            const user: UserSQLInterface | null = await UserModelMysql.findByPk(id)
            if (user) {
                return toDefaultUser(user)
            }
            else throw new Error('User not found')
        }
        catch (error) {
            console.error('Error in fetchById of userService', error)
            return null
        }
    }
    async create(user: UserInterface): Promise<UserInterface> {
        try {
            const sqlUser: UserSQLInterface = toSQLUser(user);
            sqlUser.password = await generateHash(sqlUser.password);
            const newUser: UserSQLInterface = await UserModelMysql.create(sqlUser);
            return toDefaultUser(newUser);
        } catch (error) {
            console.error('Error in create of userService', error);
            throw error;
        }
    }

    async update(id: number, user: UserInterface): Promise<UserInterface | null> {
        try {
            const sqlUser: UserSQLInterface = toSQLUser(user);
            const [updatedUser] = await UserModelMysql.update(sqlUser, { where: { id } });

            if (updatedUser === 0) return null;

            const userUpdated = await this.fetchById(id);
            return userUpdated;
        } catch (error) {
            console.error('Error in update of userService', error);
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedUser = await UserModelMysql.destroy({ where: { id } })

            if (deletedUser) {
                return true
            }
            else {
                return false
            }
        }
        catch (error) {
            console.error('Error in delete of userService', error)
            throw error
        }
    }

}
