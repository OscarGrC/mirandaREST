import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.MYSQL_URL || '', {
    dialect: 'mysql',
    logging: true,
})

export const connectMySQL = async (): Promise<void> => {

    try {
        await sequelize.authenticate()
        console.log("🟢 Conectado a MySQL");
    }
    catch (error) {
        console.error("🔴 Error conectando a MySQL:", error);
        process.exit(1)
    }
}