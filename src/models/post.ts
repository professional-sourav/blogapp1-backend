import mongoose from "mongoose";
import { Post } from "../../types/postType";
import { Post as PostModel } from "../config/schemas/postSchema"
import { PostAttachmentModel } from "../config/schemas/postAttachmentSchema";

export const getAllPosts = async () => {

    const pipeline = [
        {
          $match: {
            trashed: false // Filter out trashed documents
          }
        },
        {
          $lookup: {
            from: "postattachments", // Name of the related collection
            localField: "_id", // Field referencing related collection
            foreignField: "post", // Field in related collection being matched
            as: "attachments"
          }
        },
        {
          $addFields: {
            "attachments": { $size: "$attachments" } // Count of related documents
          }
        }
      ];

    const posts: Post[] = await PostModel.aggregate(pipeline)
    
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

export const trashSinglePost = async (id: string) => {

    const updatedPost = await PostModel.findOneAndUpdate({
        _id: id
    }, {
        trashed: true
    }, {
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
