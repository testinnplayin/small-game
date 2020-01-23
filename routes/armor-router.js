/**
 * Router for anything armor-related
 * @module armorRouter
 * @author R.Wood
 * Date : 23/01/2020
 * @requires express
 * @requires module:armorController
 */

/** @constant {Object} router - @see expressJS Router documentation */
const router = require("express").Router();

/** @constant {Object} armorController - @see module:armorController */
const armorController = require("../controllers/armor-controller");

/** create a new armor type - POST at /api/equipment/armor */
router.post("/", armorController.createArmor);


router.use((err, req, res, next) => {
    // code for error handling
    let errStatus = 500;

    if (req.errStatus) {
        errStatus = req.errStatus;
    }

    console.error(`[ERROR] at ${req.originalUrl} | ${err.stack}`);
    return res.status(errStatus).json({ message : err.message });
});

module.exports = router;