/**
 * The MongoDB/Mongoose database connector module
 * @module dbConnector
 * @author R.Wood
 * Date : 23/01/2020
 * @requires mongoose
 * @requires module:config
 */

"use strict";

/** @constant {Object} mongoose - @see MongooseJS documentation */
const mongoose = require("mongoose");

/** sets up promises for Mongoose */
mongoose.Promise = global.Promise;

/** @constant {Object} config - @see module:config */
const config = require("../../config");

/**
 * @constant {Object} connectionOptions - contains the options for the connection
 * mainly sets up the Mongoose connectino to play nicely with the newest MongoDB driver
 */
const connectionOptions = {
    autoIndex : false,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex : true
};

/** @constant {string} DATABASE_ADDRESS - @see module:config */
const DATABASE_ADDRESS = `${config.databaseUrl}:${config.databasePort}/${config.databaseName}`;

/** @exports dbConnector */
module.exports = {
    /**
     * @method dbConnector.connectToDB - connects to the database
     * @returns {Object} - a Promise
     */
    connectToDB () {
        return mongoose.createConnection(DATABASE_ADDRESS, connectionOptions);
    },
    /**
     * @method dbConnector.disconnectFromDB - disconnects client from database
     * @param {Object} conn - the connection MongoDB driver needs to close (via Mongoose) 
     * @returns {Object} - a Promise
     */
    disconnectFromDB (conn) {
        return conn.close();
    }
};
