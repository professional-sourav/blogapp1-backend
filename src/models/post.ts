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
