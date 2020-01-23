/**
 * Module containing base armor Mongoose model
 * @module equipment/Armor
 * @author R.Wood
 * Date: 23/01/2020
 * @requires mongoose
 */

"use strict";

/** @constant {Object} mongoose - @see MongooseJS documentation */
const mongoose = require("mongoose");

/** @constant {Object} armorSchema - the schema for a generic piece of armor */
const armorSchema = mongoose.Schema({
    /** @property {string} armorSchema.name - the name of the piece of armor, which is required and must be unique */
    name : {
        type : String,
        required : true,
        unique : true
    },
    /**@property {number} armorSchema.armor_bonus - used to calculated armor bonus */
    armor_bonus : {
        type : Number,
        default : 0
    },
    max_dex_bonus : {
        type : Number,
        default : 0
    },
    armor_check_penalty : {
        type : Number,
        default : 0
    },
    arcane_spell_failure : {
        type : Number,
        default : 0
    },
    price : Number,
    weight : Number
},
{
    collection : "armor"
});

const Armor = mongoose.model("Armor", armorSchema);

module.exports = { Armor };