/**
 * Module containing Character
 * @module characters/Character
 * @author R.Wood
 * Date : 20/01/2020
 * @requires module:hpDictionary
 * @requires module:attributeModifiers
 */

"use strict";

/**
 * @constant {Object} attributeModifiers - attribute modifiers dictionary - @see module:attributeModifiers 
 * @constant {Object} hpDictionary - hitpoint dictionary - @see module:hpDictionary
 */
const attributeModifiers = require("../../constants/attribute-modifiers");
const hpDictionary = require("../../constants/hp-dictionary").hpDictionary;

/** @constant {string} defaultHD - when no hit die is specified, default to a d8 */
const defaultHD = "d8";

/**
 * @class Character
 * @param {string=defaultHD} hitDice - hit dice of the character
 * @param {number=0} level - level of the character
 */
function Character (name, hitDice=defaultHD, level=0, abilities, size) {
    this.name = name;
    this.hitDice = hitDice;
    this.hitPoints = this.determineHPs();
    this.level = level;
    this.abilities = abilities;
    this.initiative = attributeModifiers.attributeModifiers[this.abilities.dexterity];
    this.size = size;
    // this.ac = 
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
     * @constant {Object} abilities - the abilities of the character, made as a shallow copy of the property
     * @constant {number} modifier - the constitution modifier for the hitpoints
     */
    const initialHPs = hpDictionary[this.hitDice];
    const currentLevel = this.level;
    const abilities = Object.assign({}, this.abilities);
    const modifier = attributeModifiers.attributeModifiers[abilities.constitution];

    /** 
     * @constant {number[]} levelArr - an array containing each level all the way up to the current level 
     * @constant {number} lng - length of the level array
    */
    const levelArr = Array.from({ length : currentLevel }, (i, k) => k);
    const lng = levelArr.length;

    /** @var {number=initialHPs} - will contain the total hitpoints of the character  */
    let totalHPs = initialHPs + modifier;

    for (let i = 1; i < lng; i++) {
        /** @constant {number} newHPs - the new hitpoints per level */
        const newHPs = Math.round(Math.random() * initialHPs);

        totalHPs += newHPs + modifier;
    }


    return totalHPs;
};

Character.prototype.calculateArmorClass = function () {
    const abilities = Object.assign({}, this.abilities);
    const modifier = attributeModifiers.attributeModifiers[abilities.dexterity];
    // add any other special mods + armor here
    return attributeModifiers.sizeModifiers[this.size] + modifier;
};

/** @exports characters/Character */
module.exports = { Character };