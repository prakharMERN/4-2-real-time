import express from 'express'
import { bodyValidation } from '../validators/validation.js'
import { registerSchema } from '../validators/register.schema.js'
import { loginSchema } from '../validators/login.schema.js'
import { login, auth, register, logout, getUsers } from '../controllers/user.controller.js'
import { protectRoute } from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/register', bodyValidation(registerSchema), register)
router.post('/login', bodyValidation(loginSchema), login)
router.post('/logout', logout)
router.get('/auth', protectRoute, auth)
router.get('/users', protectRoute, getUsers)

export default router