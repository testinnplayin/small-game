/**
 * Main app module
 * @module app
 * @author R.Wood
 * Date : 23/01/2020
 * @requires express
 */

/** @constant {Object} express - @see expressJS documentation */
const express = require("express");

/** @constant {Object} app - the app object */
const app = express();

/** @exports app */
module.exports = { app };