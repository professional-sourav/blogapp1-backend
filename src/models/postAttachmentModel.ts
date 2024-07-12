import { PostAttachmentModel } from "../config/schemas/postAttachmentSchema"
import { PostAttachment } from "../../types/postAttachmentType";

export const createNewPostAttachment = async (postAttachment: PostAttachment) => {

    const newPostAttachment = await PostAttachmentModel.create(postAttachment)

    return newPostAttachment;
}