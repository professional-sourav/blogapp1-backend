import mongoose from "mongoose";

const postAttachmentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    attachment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    trashed: {
        type: Boolean,
        required: false,
        default: false
    }
})

export const PostAttachmentModel = mongoose.model(
    'PostAttachment',
    postAttachmentSchema
)
