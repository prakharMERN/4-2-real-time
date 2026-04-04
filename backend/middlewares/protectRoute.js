import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt
        console.log(req.cookies)
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (decoded && decoded.id) {
                const user = await User.findById(decoded.id).select('-password')
                req.user = user
                return next()
            } else {
                return res.reject(400, 'token is not valid')
            }
        } else {
            return res.reject(400, 'no token')
        }
    } catch (error) {
        return res.reject(400, 'token is not valid')
    }
}