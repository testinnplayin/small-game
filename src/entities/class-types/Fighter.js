/**
 * Module containing Fighter base class
 * @module class-types/Fighter
 * @author R.Wood
 * Date: 18/01/2020
 */

"use strict";

/** @constant {Object} toHitTable - fighter's to hit table */
const toHitTable = {
    0 : [1],
    1 : [2],
    2 : [3],
    3 : [4],
    4 : [5],
    5 : [6, 1],
    6 : [7, 2],
    7 : [8, 3],
    8 : [9, 4],
    9 : [10, 5],
    10 : [11, 6, 1],
    11 : [12, 7, 2],
    12 : [13, 8, 3],
    13 : [14, 9, 4],
    14 : [15, 10, 5],
    15 : [16, 11, 6, 1],
    16 : [17, 12, 7, 2],
    17 : [18, 13, 8, 3],
    18 : [19, 14, 9, 4],
    19 : [20, 15, 10, 5]
};

/**
 * @class Fighter - a new Fighter class
 */
function Fighter () {
    this.baseHPs = "d10";
    this.weaponTypes = ["ammo", "simpleMelee", "simpleRanged", "martialMelee", "martialRanged"];
    this.armorTypes = ["light", "medium", "heavy"];
    this.toHitTable = toHitTable;
}


/** @exports class-types/Fighter */
module.exports = { Fighter };