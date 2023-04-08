import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { bookSchema } from "../schemas/Book.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import bookControllers from "../controllers/bookControllers.js";


const bookRoutes = Router();

bookRoutes.post('/', authMiddleware.authValidation, validateSchema(bookSchema), bookControllers.create);

export default bookRoutes;