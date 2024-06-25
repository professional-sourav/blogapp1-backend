import { postRouter } from "./postRoutes";
import express from "express";

export const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.send('Blog App API');
})

mainRouter.use('/posts', postRouter);
