/**
 * Module containing Character
 * @module characters/Character
 * @author R.Wood
 * Date : 20/01/2020
 * @requires module:hpDictionary
 * @requires module:attributeModifiers
 * @requires module:dbConnector
 * @requires module:errorMessages
 * @requires module:Armor
 */

"use strict";

/**
 * @constant {Object} attributeModifiers - attribute modifiers dictionary - @see module:attributeModifiers 
 * @constant {Object} hpDictionary - hitpoint dictionary - @see module:hpDictionary
 */
const attributeModifiers = require("../../constants/attribute-modifiers");
const hpDictionary = require("../../constants/hp-dictionary").hpDictionary;

/** 
 * @constant {number} baseAC - base armor class
 * @constant {string} defaultHD - when no hit die is specified, default to a d8
 */
const baseAC = 10;
const defaultHD = "d8";

/** 
 * @constant {Object} dbConnector - @see module:dbConnector
 * @constant {Object} errorMessages - @see module:errorMessages
 */
const dbConnector = require("../../data-base/db-connector");
const errorMessages = require("../../constants/error-messages");

/** @constant {Object} armorSchema - @see module:equipment/Armor */
const { armorSchema } = require("../equipment/Armor");

/**
 * @class Character
 * @param {string=defaultHD} hitDice - hit dice of the character
 * @param {number=0} level - level of the character
 */
function Character (name, hitDice=defaultHD, level=0, abilities, size, equipment, other, classType) {
    this.name = name;
    this.hitDice = hitDice;
    this.hitPoints = this.determineHPs();
    this.toHitMelee = this.determineToHit(abilities.strength);
    this.toHitRanged = this.determineToHit(abilities.dexterity);
    this.level = level;
    this.abilities = abilities;
    this.initiative = attributeModifiers.attributeModifiers[this.abilities.dexterity];
    this.size = size;
    this.equipment = equipment;
    this.other = other;
    this.classType = classType;
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

/**
 * @method Character.calculateArmorClass - method that calculates armor class asynchronously
 * @returns {Object} - a Promise; success will send a number to where it is used, error returns an error object
 */
Character.prototype.calculateArmorClass = function () {
    /**
     * @constant {Object} abilities - shallow copy of the abilities property
     * @constant {Object} equipment - shallow copy of the equipment property
     * @constant {Object} other - shallow copy of the other property
     * @constant {number} modifier - the dexterity modifier
     */
    const abilities = Object.assign({}, this.abilities);
    const equipment = Object.assign({}, this.equipment);
    const other = Object.assign({}, this.other);
    const modifier = attributeModifiers.attributeModifiers[abilities.dexterity];
    
    /**
     * @var {Object=undefined} db - database object
     * @var {number=0} natural - any natural modifiers are put here
     */
    let db,
        natural = 0;

    /** if there is any natural armor class modifier then put it in the natural variable */
    if (other.naturalAC) {
        natural = other.naturalAC;
    }

    return new Promise((resolve, reject) => {
        dbConnector.connectToDB()
            .then(database => {
                if (!database) {
                    /** @throws a database error to the console */
                    throw new Error(errorMessages.databaseError);
                }

                db = database;

                /** @constant {Object} Armor - @see MongooseJS documentation on models */
                const Armor = db.model("Armor", armorSchema);

                return Armor.findOne({ _sys_name : equipment.armor });
            })
            .then(armor => {
                if (!armor) {
                    /** @throws a 404-style message */
                    throw new Error("cannot find armor");
                }

                /** @constant {number} ac - the armor class */
                const ac = baseAC + attributeModifiers.sizeModifiers[this.size] + modifier + armor.armor_bonus + natural;
                resolve(ac);
            })
            .then(() => dbConnector.disconnectFromDB(db))
            .catch(err => reject(err));
    });
};

/**
 * @method Character.determineToHit - calculates the to hit
 * @param {string} ability - either strength (for melee) or dex (for ranged)
 * @returns {number} - the to hit based on ability modifier, level and class type (and size)
 */
Character.prototype.determineToHit = function (ability) {
    /**
     * @constant {number} abilityModifier - any ability modifier
     * @constant {number} sizeMod - any size modifier
     * @constant {number} level - character's level
     */
    const abilityModifier = attributeModifiers.attributeModifiers[ability];
    const sizeMod = attributeModifiers.sizeModifiers[this.size];
    const level = this.level;

    /** @var {number[]=[0]} levelMods - level modifiers reliant on class type */
    let levelMods = [0];

    if (this.classType) {
        levelMods = this.classType.toHitTable[level];
    }

    /** an array of modified to hit's */
    return levelMods.map(lMod => lMod + abilityModifier + sizeMod);
}

/** @exports characters/Character */
module.exports = { Character };