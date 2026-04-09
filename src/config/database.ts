import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("MONGO_URI não definida");
    }

    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB conectado: ${conn.connection.host}`)

    } catch (error) {
        console.log("Erro ao conectar ao mongo DB" + error);
        process.exit(1);
    }

}