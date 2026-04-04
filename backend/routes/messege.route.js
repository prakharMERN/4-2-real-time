import express from 'express'
import { getMesseges } from '../controllers/messege.controller.js'

const router = express.Router()

router.get('/:id', getMesseges)


export default router