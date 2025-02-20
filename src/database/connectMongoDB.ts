import mongoose from "mongoose";
import * as dotenv from "dotenv";

export const connectMongoDB = async () => {
    dotenv.config();
    try {
        await mongoose.connect(process.env.MONGO_URI || "fallo");
        console.log("🟢 Conectado a MongoDB");
    } catch (error) {
        console.error("🔴 Error conectando a MongoDB:", error);
        process.exit(1);
    }
};
