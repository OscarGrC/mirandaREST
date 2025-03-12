
import { DataTypes, Model } from "sequelize"
import { sequelize } from '../../database/connectSQL'
import { RoomSQLInterface } from "../../interfaces/sqlInterfaces/RoomSQLInterface"
import { RoomType } from "../../interfaces/roomTypeEnum"

export class RoomModelMysql extends Model<RoomSQLInterface> {
    id!: number;
    number!: string;
    type!: RoomType;
    amenities!: string;
    price!: number;
    offert_price!: number;
    offert!: boolean;
    status!: boolean;
    cancelation!: string;
    description!: string;
    photos!: string;
}

RoomModelMysql.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [Object.values(RoomType)],
            },
        },
        amenities: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        offert_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        offert: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        cancelation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photos: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "rooms",
        timestamps: false
    }
)