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
    this.nane = name;
    this.classType = classType;
    this.hitPoints = hpDictionary[classType.baseHPs];
}

Player.prototype.determineHPs = function () {
    const hitDice = hpDictionary[this.classType.baseHPs];
    const newLevelHPs = Math.round(Math.random() * hitDice);

    this.hitPoints += newLevelHPs;
    console.log("New hitpoints are ", this.hitPoints);
};

const baseFighter = new Fighter();

const myChar = new Player("My Char", baseFighter);
myChar.determineHPs();