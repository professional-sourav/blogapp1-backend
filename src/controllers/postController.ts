import { Request, Response } from "express"
import { 
    createNewPost, 
    getAllPosts, 
    getPostById, 
    trashSinglePost, 
    updateSinglePost 
} from "../models/post"
import { Post } from "../../types/postType"
import { PostAttachment } from "../../types/postAttachmentType";
import { createNewPostAttachment } from "../models/postAttachmentModel"

export const all = async (req: Request, res: Response) => {

    const posts = await getAllPosts()

    if (posts.length === 0) {
        res.status(404).json({ message: "No posts found" })
    } else {
        res.status(200).json(posts)
    }
}

export const create = async (req: Request, res: Response) => {

    const post: Post = req.body

    if (!post.slug) {
        post.slug = post.title.toLowerCase().replace(/ /g, "-")
    }

    const newPost = await createNewPost(post)
    .catch((err) => {
        console.log(err.message);
        
        res.status(500).json({ message: err.message })
    })

    if (newPost) {
        res.status(201).json(newPost)
    }
}

export const single = async (id: number) => {

}

export const update = async (req: Request, res: Response) => {

    const post = req.body as Post;

    const existingPost = await getPostById(req.params.id)
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })

    if (existingPost) {
        const updatedPost = await updateSinglePost(req.params.id, post).catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })

        if (updatedPost) {
            res.status(200).json(updatedPost)    
        }
    } else if (typeof existingPost !== 'undefined') {

        res.status(404).json({ message: "Post not found" })
    }  
}

export const remove = async (req: Request, res: Response) => {

    const post = req.body as Post;

    const existingPost = await getPostById(req.params.id)
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })


    if (existingPost) {

        trashSinglePost(req.params.id)
        .then((deletedPost) => {
            res.status(200).json(deletedPost)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    } else if (typeof existingPost !== 'undefined') {

        res.status(404).json({ message: "Post not found" })
    }    
}

export const upload = async (req: Request, res: Response) => {

    if (req.file === undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
    }

    const attachmentData: PostAttachment = {
        post: req.params.id,
        attachment: req.file?.path,
        createdAt: new Date()
    }

    const newAttachment = await createNewPostAttachment(
        req.params.id, 
        attachmentData
    )

    res.status(201).json(newAttachment)
}
