import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { responseHandler } from './middlewares/responseHandler.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { noRoute } from './middlewares/noRoute.js'
import { db } from './db/db.js'
import { protectRoute } from './middlewares/protectRoute.js'

import userRouter from './routes/user.route.js'
import messegeRouter from './routes/messege.route.js'

import { server, app } from './lib/socket.js'



dotenv.config()


app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())

app.use(responseHandler)


app.use('/users/', userRouter)
app.use('/messeges', protectRoute, messegeRouter)


app.get("/health", (req, res) => {
    res.send("OK");
});

app.get('/route', (req, res) => {
    res.send(process.env.FRONTEND_URL)
})

app.use(noRoute)
app.use(errorHandler)



const PORT = process.env.PORT || 3000

server.listen(PORT, async () => {
    await db()
    console.log(`server is lintening on PORT : ${PORT}.`)
})