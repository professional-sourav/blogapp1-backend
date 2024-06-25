import express, { Express } from "express";
import dotenv from "dotenv";
import { mainRouter } from "./routes/routes";
import { connectToDb } from "./config/db";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();

const DbConnection = connectToDb();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(mainRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
