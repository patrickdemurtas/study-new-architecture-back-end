import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { bookSchema } from "../schemas/Book.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import bookControllers from "../controllers/bookControllers.js";


const bookRoutes = Router();

bookRoutes.post('/', authMiddleware.authValidation, validateSchema(bookSchema), bookControllers.create);
bookRoutes.get('/', authMiddleware.authValidation, bookControllers.findAll);
bookRoutes.post('/take-book/:id', authMiddleware.authValidation, bookControllers.takeBook);
bookRoutes.get('/my-books', authMiddleware.authValidation, bookControllers.findAllMyBooks);


export default bookRoutes;