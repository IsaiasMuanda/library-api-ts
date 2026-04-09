import express from "express";
import "dotenv/config"
import { connectDB } from "./config/database.ts";
import userRoutes from "./modules/user/user.routes.ts"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ message: "API rodando" });
})

app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
}

startServer();
