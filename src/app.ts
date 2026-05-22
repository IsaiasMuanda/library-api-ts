import "reflect-metadata";
import express from "express";
import "dotenv/config";
import userRoutes from "./modules/user/user.routes.ts";
import authRoutes from "./modules/auth/auth.routes.ts";
import authorRoutes from "./modules/author/author.routes.ts"
import bookRoutes from "./modules/book/book.routes.ts";
import cartRoutes from "./modules/cart/cart.routes.ts"
import reservationRoutes from "./modules/reservation/reservation.routes.ts"
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { globalRateLimiter } from "./middlewares/rateLimit.middleware.ts";

const app = express();

app.use(express.json());
app.use(globalRateLimiter); 


app.get("/", (req, res) => {
    return res.json({ message: "API rodando" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reservations", reservationRoutes);

app.use(errorMiddleware);

export { app };