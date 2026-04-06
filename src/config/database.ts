import mongoose from "mongoose";

export async function connectDB() {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error("MONGO_URI não definida");
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB conectado: ${conn.connection.host}`)
    } catch (error) {
        console.log("Erro ao conectar ao mongo DB" + error);
        process.exit(1);
    }
}