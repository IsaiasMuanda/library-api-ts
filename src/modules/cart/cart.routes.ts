import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { CartController } from "./cart.controller";
import { container } from "../../config/container";
import { TYPES } from "../../shared/types/TYPES";
import { ICartService } from "./cart.interface";
import { validate } from "../../middlewares/validate.middleware";
import { AddToCartSchema, UpdateQuantitySchema } from "./cart.schema";

const router = Router();

const cartService = container.get<ICartService>(TYPES.ICartService);
const cartController = new CartController(cartService);

router.get("/", authMiddleware, cartController.getCart.bind(cartController));
router.post("/items", authMiddleware, validate(AddToCartSchema), cartController.addToCart.bind(cartController));
router.patch("/items/:bookId", authMiddleware, validate(UpdateQuantitySchema), cartController.updateCart.bind(cartController));
router.delete("/items/:bookId", authMiddleware, cartController.removeToCart.bind(cartController));
router.delete("/", authMiddleware, cartController.clearCart.bind(cartController));
router.post("/checkout", authMiddleware, cartController.checkOut.bind(cartController));

export default router;