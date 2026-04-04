import http from 'http'
import { Server } from 'socket.io'
import express from 'express'
import cookie from 'cookie'
import { getUserFromToken } from './getUserFromToken.js'
import { sendMessage } from '../controllers/messege.controller.js'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true
    },
    cookie: true,
})


io.use(async (socket, next) => {
    try {
        const jwt = cookie.parse(socket.request?.headers?.cookie || '')?.jwt
        // console.log(jwt, socket.request.headers)
        if (jwt) {
            const user = await getUserFromToken(jwt)
            if (user) {
                socket.user = user
                return next()
            } else {
                return next(new Error('invalid token'))
            }
        } else {
            return next(new Error('no token'))
        }
    } catch (error) {
        // console.log(error)
        next(error)
    }
})

export const usersList = {}


io.on("connection", (socket) => {
    const userId = socket.user._id
    usersList[userId] = socket.id
    // console.log(usersList)

    // console.log(userId.toString())
    socket.join(userId.toString())

    io.emit('users-list', Object.keys(usersList))

    socket.on('send-messege', async (data) => {
        await sendMessage(socket, data, io)
    })

    socket.on('disconnect', () => {
        delete usersList[userId]
        io.emit('users-list', Object.keys(usersList))
        // console.log('disconnected', socket.id)
    })
})


export { server, app }