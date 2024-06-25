import mongoose from "mongoose";
import { Post } from "../../types/postType";
import { Post as PostModel } from "../config/schemas/postSchema"

export const getAllPosts = async () => {

    const posts = await PostModel.find({})
    
    if (!posts) {
        return [];
    }

    return posts;
}

export const createNewPost = async (post: Post) => {

    const newPost = new PostModel(post)

    await newPost.save()

    return newPost;
}

export const getPostById = async (id: string) => {

    let postId = null;

    try {
        postId = new mongoose.Types.ObjectId(id);
    } catch (error: any) {
        throw new Error("Invalid post ID")
    }    

    const post = await PostModel.findById(postId)

    return post;    
}

export const updateSinglePost = async (id: string, post: Post) => {

    const updatedPost = await PostModel.findOneAndUpdate({
        _id: id
    }, post, {
        new: true
    })

    return updatedPost;
}

export const deleteSinglePost = async (id: string) => {

    const deletedPost = await PostModel.findOneAndDelete({
        _id: id
    })

    return deletedPost;
}
