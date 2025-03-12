import { DataTypes, Model } from "sequelize"
import { sequelize } from '../../database/connectSQL'
import { UserSQLInterface } from "../../interfaces/sqlInterfaces/UserSQLInterface"



export class UserModelMysql extends Model<UserSQLInterface> {
    id!: number
    photo!: string
    fullName!: string
    email!: string
    startDate!: string
    description!: string
    phone!: string
    stade!: boolean
    password!: string
    puesto!: string;
}



UserModelMysql.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        puesto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stade: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false
    }
)