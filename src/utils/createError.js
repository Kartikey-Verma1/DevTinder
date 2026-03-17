const createError = (statusCode, message, extra={}) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.data = extra;
    
    return err;
}

module.exports = createError;