const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const PersonSchema = new Schema({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    deathday: { type: String, required: true },
    gender: { type: String, required: true }
});

module.exports = PersonSchema;