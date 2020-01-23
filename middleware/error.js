const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = {...err};
    error.message = err.message;

    // log to console for developing
    console.log(err); // disply err.stack in red in console

    // IF statement executes when mongoose returns 'CastError' which is returned when we submit a bad bootcamp ID
    console.log(err.name);
    if(err.name === 'CastError'){
        const message = `Resource not found with ID of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key error
    if(err.code === 11000){
        const message = 'Duplicate field value entered'
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    if(err.name === 'StrictModeError'){
        const message = 'Data recieved does not match expectated data'
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;