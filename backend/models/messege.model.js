import mongoose from "mongoose";

const messegeSchema = mongoose.Schema({
    senderId: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recieverId: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        maxlength: [500, 'maximum length of a message is 500 characters']
    },
    image: {
        type: String,
        default: null
    }
}, { timestamps: true })

export const Messege = mongoose.model('Messege', messegeSchema)