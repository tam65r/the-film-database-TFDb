const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonSchema = require('./person');

const CastSchema = new Schema({
    person_id: {type: String, required: true},
    role: {type: String, required: true},
    job: {type: String, required: true},
    details: PersonSchema,
  });

module.exports = CastSchema