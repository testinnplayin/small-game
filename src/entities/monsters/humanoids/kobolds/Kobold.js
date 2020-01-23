/**
 * Module containing kobold
 * @module monsters/kobold
 * @author R.Wood
 * Date: 23/01/2020
 * @requires module:characters/Character
 */

"use strict";

/** @constant {Object} Character - @see module:characters/Character */
const { Character } = require("../../../characters/Character");

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
        armor : "LEATHER"
    },
    {
        naturalAC : 1
    }
);

Kobold.calculateArmorClass()
    .then(ac => {
        console.log("ac ", ac);
    })
    .catch(err => console.error(err));
module.exports = { Kobold };