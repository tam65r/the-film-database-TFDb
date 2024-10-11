function errorHandler(err, req, res, next) {
    
    const statusCode = err.status || 500;
    res.status(statusCode);

    res.render('error', {
        message: err.message,
        error: {
            status: statusCode,
            stack: err.stack
        }
    });
}
module.exports = errorHandler;