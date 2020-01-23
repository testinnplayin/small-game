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
    useCreateIndex : true,
    /** @see module:config.databaseName */
    dbName : config.databaseName
};

/** @constant {string} DATABASE_ADDRESS - @see module:config */
const DATABASE_ADDRESS = `${config.databaseUrl}/${config.databasePort}`;

/** @exports dbConnector */
module.exports = {
    /**
     * @method dbConnector.connectToDB - connects to the database
     * @returns {Object} - a Promise
     */
    connectToDB () {
        return new Promise((resolve, reject) => {
            mongoose.connect(DATABASE_ADDRESS, connectionOptions)
                .then(client => {
                    console.log("---- Connected to database ----");
                    resolve(client);
                })
                .catch(err => reject(err));
        });
    },
    /**
     * @method dbConnector.disconnectFromDB - disconnects client from database
     * @param {Object} client - the connection MongoDB driver needs to close (via Mongoose) 
     * @returns {Object} - a Promise
     */
    disconnectFromDB (client) {
        return new Promise((resolve, reject) => {
            mongoose.close(client)
                .then(() => {
                    console.log("---- Database connection closed ----");
                    resolve();
                })
                .catch(err => reject(err));
        });
    }
};
