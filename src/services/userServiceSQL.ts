
import { UserSQLInterface } from "../interfaces/sqlInterfaces/UserSQLInterface";
import { UserModelMysql } from "../models/sql/userSql";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { generateHash } from "../utils/token";

export class UserServiceSQL implements ServiceInterface<UserSQLInterface> {



    async fetchAll(): Promise<UserSQLInterface[]> {
        try {
            const users: UserSQLInterface[] = await UserModelMysql.findAll()
            return users
        }
        catch (error) {
            console.error('Error in fetchAll of userService', error)
            throw error
        }
    }

    async fetchById(id: number): Promise<UserSQLInterface | null> {
        try {
            const user: UserSQLInterface | null = await UserModelMysql.findByPk(id)
            if (user) return user
            else throw new Error('User not found')
        }
        catch (error) {
            console.error('Error in fetchById of userService', error)
            return null
        }
    }
    async create(user: UserSQLInterface): Promise<UserSQLInterface> {
        try {
            user.password = await generateHash(user.password)
            const newUser: UserSQLInterface = await UserModelMysql.create(user)
            return newUser
        }
        catch (error) {
            console.error('Error in create of userService', error)
            throw error
        }
    }

    async update(id: number, user: UserSQLInterface): Promise<UserSQLInterface | null> {
        try {
            const [updatedContact] = await UserModelMysql.update(user, { where: { id } })
            if (updatedContact === 0) return null

            return await this.fetchById(id)
        }
        catch (error) {
            console.error('Error in update of userService', error)
            throw error
        }
    }


    async delete(id: number): Promise<boolean> {
        try {
            const deletedUser = await UserModelMysql.destroy({ where: { id } })

            if (deletedUser) return true
            else return false
        }
        catch (error) {
            console.error('Error in delete of userService', error)
            throw error
        }
    }

}
