import express from 'express';
import {  
    all, 
    create, 
    remove,
    single, 
    update, 
    upload
} from '../controllers/postController';
import multer from "multer";

export const postRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const uploadFile = multer({ storage: storage })

postRouter.get('/', all)
postRouter.get('/:id', single)
postRouter.post('/create', create)
postRouter.patch('/update/:id', update)
postRouter.post('/:id/upload', uploadFile.single('attachment'), upload)
postRouter.delete('/delete/:id', remove)
