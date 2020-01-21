/**
 * Module containing Character
 * @module characters/Character
 * @author R.Wood
 * Date : 20/01/2020
 * @requires module:hpDictionary
 */

"use strict";

/** @constant {Object} hpDictionary - hitpoint dictionary - @see module:hpDictionary */
const hpDictionary = require("../../constants/hp-dictionary");

/** @constant {string} defaultHD - when no hit die is specified, default to a d8 */
const defaultHD = "d8";

/**
 * @class Character
 * @param {string=defaultHD} hitDice - hit dice of the character
 * @param {number=0} level - level of the character
 */
function Character (name, hitDice=defaultHD, level=0) {
    this.name = name;
    this.hitDice = hitDice;
    this.hitPoints = this.determineHPs();
    this.level = level;
}

/**
 * @method Character#determineHPs - used to calculate the hitpoints based off of HD and level of the character
 * modifiers are added
 * @returns {number} the total number of hitpoints
 */
Character.prototype.determineHPs = function () {
    /**
     * @constant {number} initialHPs - the initial hitpoints of the character - @see module:hpDictionary
     * @constant {number} currentLevel - the level of the character
     */
    const initialHPs = hpDictionary[this.hitDice];
    const currentLevel = this.level;
    // const modifier = this.modifier;

    /** 
     * @constant {number[]} levelArr - an array containing each level all the way up to the current level 
     * @constant {number} lng - length of the level array
    */
    const levelArr = Array.from({ length : currentLevel }, (i, k) => k);
    const lng = levelArr.length;

    /** @var {number=initialHPs} - will contain the total hitpoints of the character  */
    let totalHPs = initialHPs;

    for (let i = 1; i < lng; i++) {
        /** @constant {number} newHPs - the new hitpoints per level */
        const newHPs = Math.round(Math.random() * initialHPs);

        // NOTE: don't forget to add modifier here
        totalHPs += newHPs;
    }


    return totalHPs;
};

module.exports = { Character };