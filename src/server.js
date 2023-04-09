import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { handleApplicationErrors } from "./middlewares/errorMiddleware.js";
dotenv.config()

const app = express();
app.use(cors());
app.use(json());

app.use(routes);

app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running in port: ${port}`));