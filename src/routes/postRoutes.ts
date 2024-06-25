import express from 'express';
import {  
    all, 
    create, 
    remove,
    single, 
    update 
} from '../controllers/postController';

export const postRouter = express.Router();

postRouter.get('/', all)
postRouter.get('/:id', single)
postRouter.post('/create', create)
postRouter.patch('/update/:id', update)
postRouter.delete('/delete/:id', remove)
