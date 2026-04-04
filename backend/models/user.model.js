import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [2, 'name should have atleast have 2 character']
    },
    email: {
        type: String,
        unique: [true, 'email exist'],
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must be atleast 6 character']
    }
})


export const User = mongoose.model('User', userSchema)