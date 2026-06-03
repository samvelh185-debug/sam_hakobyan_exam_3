const errorHandler = (err, req, res, next) => {
    console.error('--- ERROR LOG ---');
    console.error(err.stack || err);
    console.error('-----------------');

    if (err.isJoi) {
        return res.status(400).json({
            status: 'error',
            type: 'ValidationError',
            message: err.details.map(d => d.message).join(', ')
        });
    }

    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            status: 'error',
            type: 'ConflictError',
            message: 'Record with this data already exists.'
        });
    }

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
};

export default errorHandler;

