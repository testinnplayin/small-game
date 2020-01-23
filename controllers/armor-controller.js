/**
 * Controller for armor routes
 * @module armorController
 * @author R.Wood
 * Date : 23/01/2020
 * @requires mongoose
 * @requires module:dbConnector
 * @requires module:equipment/Armor
 * @requires module:errorMessages
 */

"use strict";

/** @constant {Object} mongoose - @see MongooseJS documentation */
// const mongoose = require("mongoose");

/** @constant {Object} dbConnector - @see module:dbConnector */
const dbConnector = require("../src/data-base/db-connector");

/** @constant {Object} armorSchema - @see module:equipment/Armor */
const { armorSchema } = require("../src/entities/equipment/Armor");

/** @constant {Object} errorMessages - @see module:errorMessages */
const errMessages = require("../src/constants/error-messages");

/** @exports armorController */
module.exports = {
    /**
     * @method armorController.createArmor - adds a new armor template to the database
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @callback next - Express middleware
     * @returns {Object} - either a successful or errored response
     */
    createArmor (req, res, next) {
        /** @var {Object=undefined} db - where the database object will be stored */
        let db;

        /** @see module:dbConnector.connectToDB */
        dbConnector.connectToDB()
            .then(database => {
                if (!db) {
                    throw new Error(errorMessages.databaseError);
                }
                db = database;
                
                /** @constant {Object} Armor - @see module:equipment/Armor */
                const Armor = db.model("Armor", armorSchema);

                return Armor.create(req.body);
            })
            .then(newArmor => {
                /** for debugging purposes send the newly-created armor to the client */
                return res.status(200).json({ armor : newArmor });
            })
            .then(() => {
                return dbConnector.disconnectFromDB(db);
            })
            .catch(next);
    }
};