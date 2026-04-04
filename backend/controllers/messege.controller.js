import { usersList } from '../lib/socket.js'
import { Messege } from '../models/messege.model.js'

export const getMesseges = async (req, res, next) => {
    try {
        const userId = req.user._id
        const id = req.params.id


        const msgs = await Messege.find({
            $or: [
                { senderId: id, recieverId: userId },
                { senderId: userId, recieverId: id }
            ]
        })

        res.resolve(200, { messages: msgs })

    } catch (error) {
        next(error)
    }
}

export const sendMessage = async (socket, data) => {
    try {
        const { recieverId, text } = data
        const senderId = socket.user._id

        const msg = await Messege.create({ text, recieverId, senderId })
        // console.log(msg,recieverId)
        // console.log(socket.user, recieverId)
        // socket.to(usersList[recieverId]).emit('recieve-messege', msg)
        socket.to(recieverId).emit('recieve-messege', msg)
    } catch (error) {
        console.log(error)
        // next(error)
    }
}