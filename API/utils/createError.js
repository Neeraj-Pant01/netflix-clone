const createError = (err, message) =>{
    const error = new Error()
    err.status = err
    err.message = message

    return error;
}

module.exports = createError;