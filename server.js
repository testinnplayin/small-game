/**
 * The module containing the basic server
 * @module server
 * @author R.Wood
 * Date : 21/01/2020
 * @requires http - native http module
 * @requires module:config
 * @requires module:app
 */

"use strict";

/** @constant {Object} http - @see NodeJS native http module */
const http = require("http");

/** @constant {Object} app - @see module:app */
const { app } = require("./app");

/** @constant {Object} config - @see module:config configuration module */
const config = require("./config");
const PORT = config.port;

const server = http.createServer(app);

server.listen(PORT, err => {
    if (err) {
        console.error(`[ERROR] Problem while trying to launch server ${err}`);
    }
    console.log(`---- Server listening on port ${PORT} ----`);
});