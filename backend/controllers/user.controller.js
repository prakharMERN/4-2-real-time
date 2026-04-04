import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/generateToken.js'

export const register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req?.value?.password, salt)
        const user = await User.create({ ...req?.value, password: hash })
        // console.log(user)
        if (user) {
            generateToken(res, user._id)
            return res.resolve(201, { user: { name: user.name, email: user.email, _id: user._id, password: undefined } })
        }
    } catch (error) {
        // console.log(error)
        if (error.code === 11000) {
            return res.reject(400, 'email exist')
        }
        next(error)
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req?.value?.email })

        if (user) {
            const varify = await bcrypt.compare(req?.value?.password, user.password)

            if (varify) {
                generateToken(res, user._id)
                return res.resolve(200, { user: { user: user.name, _id: user._id, email: user.email } })
            } else {
                return res.reject(400, 'invalid email pr password')
            }
        }

        return res.reject(400, 'invalid email or password')
    } catch (error) {
        // console.log(error)
        next(error)
    }
}

export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0, httpOnly: true, secure: false }).status(200).resolve(200, 'logged out')
}


export const auth = async (req, res, next) => {
    return res.resolve(200, { user: req.user })
}


export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password -v -email')

        res.resolve(200, users)
    } catch (error) {
        next(error)
    }
}