import express, { Express } from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routes/routes";

dotenv.config();

const app: Express = express();

app.use(mainRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
