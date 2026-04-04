export const bodyValidation = (schema) => (req, res, next) => {

    req.body = req.body || {}
    const { error, value } = schema.validate(req.body, { allowUnknown: false })

    if (error) {
        return res.reject(400, error.message)
    }

    req.value = value
    next()
}


export const paramValidation = schema => (req, res, next) => {
    const { error, value } = schema.validate(req.params, { allowUnknown: false })
    
    if (error) {
        return res.reject(400, error.message)
    }
    
    next()
}