import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { connectDB } from "./config/database.ts"
import userRoutes from "./modules/user/user.routes.ts";
import authRoutes from "./modules/auth/auth.routes.ts";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    return res.json({ message: "API rodando" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
}

startServer();