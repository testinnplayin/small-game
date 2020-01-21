/**
 * Module containing Player 
 * @module characters/Player
 * @author R.Wood
 * Date: 18/01/2020
 * @requires module:hpDictionary
 * @requires module:class-types/Fighter
 */

"use strict";

/** @constant {Object} hpDictionary - hitpoint dictionary - @see module:hpDictionary */
const hpDictionary = require("../../constants/hp-dictionary").hpDictionary;

/** @constant {Object} Fighter - @see module:class-types/Fighter - for test purposes */
const {Fighter} = require("../class-types/Fighter");

/**
 * @class Player - the new player character object
 * @param {string} name - the name of the new Player character 
 * @param {string} classType - the type of class for the new character
 */

function Player (name, classType) {
    this.name = name;
    this.classType = classType;
    this.hitPoints = hpDictionary[classType.baseHPs];
    // This is the level for calculating but the represented level is always one more
    this.level = 3
    // NOTE: needs strength modifier here
    this.toHitMelee = 0;
}

/**
 * @method Player#determineHPs - each time a player character's levels, determine new hitpoints
 * this sets the hitPoints property to the new amount of hitpoints
 */
Player.prototype.determineHPs = function () {
    /**
     * @constant {number} hitDice - the hit die of the Player's character determined by class type
     * @see module:hpDictionary and also look at each class type's baseHPs property
     * @constant {number} newLevelHPs - the new amount of hitpoints
     */
    const hitDice = hpDictionary[this.classType.baseHPs];
    const newLevelHPs = Math.round(Math.random() * hitDice);

    this.hitPoints += newLevelHPs;
    console.log(`${this.name}'s new hit points are: ${this.hitPoints}`);
};

/**
 * @method Player#calculateToHit - calculates the player character's to hit
 * @param {string} toHit - this is a string determining what the character's to hit is by level
 */
Player.prototype.calculateToHit = function (toHit) {
    /** @constant {number} level - the level of the player character */
    const level = this.level;

    /**
     * +1/lvl - adds one to hit per level, eg. at level 0 is 0, level 1 is +1, level 2 is +1 for a total of +2, level 3 is +1 for a total of +3
     * +1/2lvls - adds one to hit every 2 levels, eg. at level 0 is 0, level 1 is 0, level 2 is +1, level 3 is 0 for a total of +1
     * +1/3lvls - adds one to hit every 3 levels, eg. at level 0 is 0, level 1 is 0, level 2 is 0, level 3 is +1 for a total of +1
     * +2/3lvls - adds two to hit every 3 levels, eg. at level 0 is 0, level 1 is 0, level 2 is 0, level 3 is +2 for a total of +2
     */
    switch(toHit) {
        case "+1/lvl":
            return level;
        case "+1/2lvls":
            return (level % 2 === 0) ? level / 2 : 0;
        case "+1/3lvls":
            return (level % 3 === 0) ? level / 3 : 0;
        case "+2/3lvls":
            return (level % 3 === 0) ? level / 3 + 1 : 0;
    }
};

const baseFighter = new Fighter();

const myChar = new Player("My Char", baseFighter);
myChar.determineHPs();