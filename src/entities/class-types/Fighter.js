/**
 * Module containing Fighter base class
 * @module class-types/Fighter
 * @author R.Wood
 * Date: 18/01/2020
 */

"use strict";

/**
 * @class Fighter - a new Fighter class
 */
function Fighter () {
    this.baseHPs = "d10";
    // These are placeholders
    this.weaponTypes = "all";
    this.armorTypes = "all";
    this.toHitMelee = "+1/lvl";
}

/** @exports class-types/Fighter */
module.exports = { Fighter };