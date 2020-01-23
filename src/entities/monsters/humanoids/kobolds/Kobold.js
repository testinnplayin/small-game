/**
 * Module containing kobold
 * @module monsters/kobold
 * @author R.Wood
 * Date: 23/01/2020
 * @requires module:characters/Character
 * @requires module:class-types/Sorcerer
 */

"use strict";

/** @constant {Object} Character - @see module:characters/Character */
const { Character } = require("../../../characters/Character");

/** @constant {Object} Sorcerer - @see module:class-types/Sorcerer */
const { Sorcerer } = require("../../../class-types/Sorcerer");

/** @constant {Object} Kobold - defines a Kobold template */
const Kobold = new Character(
    "Kobold", 
    "d4",
    0,
    {
        strength : 6,
        dexterity : 13,
        constitution : 11,
        intelligence : 10,
        wisdom : 10,
        charisma : 10
    },
    "small",
    {
        armor : "LEATHER",
        weapons : ["lightCrossbow", "halfSpear"]
    },
    {
        naturalAC : 1
    },
    new Sorcerer("Kobold Sorcerer")
);



module.exports = { Kobold };