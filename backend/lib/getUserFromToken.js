import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const getUserFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            const user = await User.findById(decoded.id).select('-password')
            return user
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}
