import { ErrorRequestHandler } from "express";

export const errorHandler = (): ErrorRequestHandler => (err, req, res, next) => {
    console.log('ERROR HANDLER');
    console.log(err);
    if (Array.isArray(err)) {
        res.status(409).send({
            success: false,
            message: err
        })
    } else if (err.message) {
        res.status(409).send({
            success: false,
            message: err.message
        })
    } else {
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
}