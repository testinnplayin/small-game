/**
 * Router for anything armor-related
 * @module armorRouter
 * @author R.Wood
 * Date : 23/01/2020
 * @requires express
 * @requires module:armorController
 * @requires module:errorHandlers
 */

/** @constant {Object} router - @see expressJS Router documentation */
const router = require("express").Router();

/** @constant {Object} armorController - @see module:armorController */
const armorController = require("../controllers/armor-controller");

/** @constant {Object} errorHandlers - @see module:errorHandlers */
const errorHandlers = require("../src/helpers/error-handlers");

/** create a new armor type - POST at /api/equipment/armor */
router.post("/", armorController.createArmor);


router.use(errorHandlers.handleError);

module.exports = router;