import mongoose from "mongoose";

export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        console.log('database connected successfully')
    } catch (error) {
        console.log('database connection failed', error.message)
        process.exit(1)
    }
}