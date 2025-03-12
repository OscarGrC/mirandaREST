import { DataTypes, Model } from "sequelize"
import { sequelize } from '../../database/connectSQL'
import { ContactSQLInterface } from "../../interfaces/sqlInterfaces/ContactSQLInterface"


export class ContactModelMysql extends Model<ContactSQLInterface> {
    id!: number
    date!: string
    asunto!: string
    comment!: string
    customer_name!: string;
    customer_lastname!: string;
    customer_email!: string;
    customer_phone!: string;
}

ContactModelMysql.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        asunto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize,
        tableName: "contacts",
        timestamps: false
    }
)