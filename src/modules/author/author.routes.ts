import { Router } from "express";
import { authMiddleware, requireAdmin } from "../../middlewares/auth.middleware";
import { container } from "../../config/container";
import { AuthorController } from "./author.controller";
import { TYPES } from "../../shared/types/TYPES";
import { validate } from "../../middlewares/validate.middleware";
import { createAuthorSchema, updateAuthorSchema } from "./author.schema";
import { IAuthorService } from "./author.interface";

const router = Router();

const authorService = container.get<IAuthorService>(TYPES.IAuthorService);
const authorController = new AuthorController(authorService);

router.get("/", authorController.getAllAuthors.bind(authorController));
router.get("/:id", authorController.getAuthorById.bind(authorController));
router.post("/", authMiddleware, requireAdmin, validate(createAuthorSchema), authorController.createAuthor.bind(authorController));
router.put("/:id", authMiddleware, requireAdmin, validate(updateAuthorSchema), authorController.updateAuthor.bind(authorController));
router.delete("/:id", authMiddleware, requireAdmin, authorController.deleteAuthor.bind(authorController));

export default router;