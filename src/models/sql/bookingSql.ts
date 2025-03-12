import { DataTypes, Model } from "sequelize"
import { sequelize } from '../../database/connectSQL'
import { BookingSQLInterface } from "../../interfaces/sqlInterfaces/BookingSQLInterface"
import { RoomModelMysql } from "./roomSql";

export class BookingModelMysql extends Model<BookingSQLInterface> {
    id!: number;
    guest_name!: string;
    guest_lastname!: string;
    guest_email!: string;
    guest_phone!: string;
    order_date!: string;
    check_in!: string;
    check_out!: string;
    room_type!: string;
    room_number!: string;
    special_request!: string;
}

BookingModelMysql.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        guest_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guest_lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guest_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guest_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check_in: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check_out: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_number: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: RoomModelMysql,
                key: "id",
            },
        },
        special_request: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "bookings",
        timestamps: false,
    }
)