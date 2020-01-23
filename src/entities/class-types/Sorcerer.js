/**
 * Module containing the sorcerer class type
 * @module class-types/Sorcerer
 * @author R.Wood
 * Date : 23/01/2020
 */

"use strict";

const toHitTable = {
    0 : [0],
    1 : [1],
    2 : [1],
    3 : [2],
    4 : [2],
    5 : [3],
    6 : [3],
    7 : [4],
    8 : [4],
    9 : [5],
    10 : [5],
    11 : [6, 1],
    12 : [6, 1],
    13 : [7, 2],
    14 : [7, 2],
    15 : [8, 3],
    16 : [8, 3],
    17 : [9, 4],
    18 : [9, 4],
    19 : [10, 5]
};

/** @class Sorcerer */
function Sorcerer (name) {
    this.name = name;
    this.baseHPs = "d4";
    this.weaponTypes = ["halfspear", "hand_crossbow"];
    this.armorTypes = ["padded", "leather"];
    this.toHitTable = toHitTable;
}

module.exports = { Sorcerer };