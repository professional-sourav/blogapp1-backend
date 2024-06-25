import { Request, Response } from "express"
import { createNewPost, getAllPosts } from "../models/post"
import { Post } from "../../types/postType"

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

export const update = async (id: number) => {

}

export const remove = async (id: number) => {

}
