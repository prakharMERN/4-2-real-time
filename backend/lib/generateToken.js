import jwt from 'jsonwebtoken'

export const generateToken = (res, id) => {

    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none", // ⚠️ important
        secure: process.env.IS_PRODUCTION === 'true' ? true : false
    })

}
