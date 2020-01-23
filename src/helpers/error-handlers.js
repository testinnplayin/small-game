/**
 * Module containing error handlers
 * @module errorHandlers
 * @author R.Wood
 * Date : 23/01/2020
 */

"use strict";

/** @exports errorHandlers */
module.exports = {
    /**
     * @method errorHandlers.handleError - handles an error in the app
     * @param {Object} err - error object 
     * @param {*} req - Express request object
     * @param {*} res - Express response object
     * @callback next - Express callback
     * @returns {Object} - an error response 
     */
    handleError (err, req, res, next) {
        let errStatus = 500;

        if (req.errStatus) {
            errStatus = req.errStatus;
        }

        console.error(`[ERROR] at ${req.originalUrl} | ${err.stack}`);
        return res.status(errStatus).json({ message : err.message });
    }
};