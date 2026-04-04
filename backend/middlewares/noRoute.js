export const noRoute = (req, res, next) => {
    return res.reject(400, 'no such endpoint exist')
}