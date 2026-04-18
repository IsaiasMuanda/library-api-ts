import "reflect-metadata";
import express from "express";
import "dotenv/config";
import userRoutes from "./modules/user/user.routes.ts";
import authRoutes from "./modules/auth/auth.routes.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ message: "API rodando" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export {app};