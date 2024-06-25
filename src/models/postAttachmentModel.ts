import { PostAttachmentModel } from "../config/schemas/postAttachmentSchema"
import { PostAttachment } from "../../types/postAttachmentType";

export const createNewPostAttachment = async (postId: string, postAttachment: PostAttachment) => {

    const newPostAttachment = await PostAttachmentModel.create(postAttachment)

    return newPostAttachment;
}