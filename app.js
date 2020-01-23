/**
 * Main app module
 * @module app
 * @author R.Wood
 * Date : 23/01/2020
 * @requires express
 * @requires module:armorRouter
 */

/** @constant {Object} express - @see expressJS documentation */
const express = require("express");

/** @constant {Object} app - the app object */
const app = express();

/**
 * @constant {Object} armorRouter - the router for armor-related requests
 */

const armorRouter = require("./routes/armor-router");

app.use("/api/equipment/armor", armorRouter);

app.use("*", (req, res) => {
    return res.status(404).json({ message : "Resource not found" });
});

/** @exports app */
module.exports = { app };