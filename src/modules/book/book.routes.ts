import { Router } from "express";
import { container } from "../../config/container";
import { TYPES } from "../../shared/types/TYPES";
import { IBookService } from "./book.interface";
import { BookController } from "./book.controller";
import { authMiddleware, requireAdmin } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { CreateBookSchema, UpdateBookSchema } from "./book.schema";

const router = Router();

const bookService = container.get<IBookService>(TYPES.IBookService)
const bookController = new BookController(bookService);

router.get("/", bookController.getAllBooks.bind(bookController));
router.get("/:id", bookController.getBookById.bind(bookController));
router.post("/", authMiddleware, requireAdmin, validate(CreateBookSchema), bookController.createBook.bind(bookController));
router.put("/:id", authMiddleware, requireAdmin, validate(UpdateBookSchema), bookController.updateBook.bind(bookController));
router.delete("/:id", authMiddleware, requireAdmin, bookController.deleteBook.bind(bookController));

export default router;