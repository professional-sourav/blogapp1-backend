import express from 'express';
import { 
    createNewPost, 
    deletePost, 
    getAllPosts, 
    getPostById, 
    updatePost 
} from '../controllers/postController';

export const postRouter = express.Router();

postRouter.get('/', getAllPosts)
postRouter.get('/:id', getPostById)
postRouter.post('/create', createNewPost)
postRouter.patch('/update/:id', updatePost)
postRouter.delete('/delete/:id', deletePost)
