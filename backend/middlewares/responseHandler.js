export const responseHandler = (req, res, next) => {

    res.resolve = (status = 200, data) => {
        return res.status(status).json({
            success: true,
            data: data
        })
    }
    res.reject = (status = 500, message = 'Something went wrong') => {
        return res.status(status).json({
            success: false,
            message: message
        })
    }
    next()
}

