const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const castSchema = new Schema({
    person_id: {type: String, required: true},
    role: {type: String, required: true},
    job: {type: String, required: true},
    details: { type: Schema.Types.ObjectId, ref: "Person"},
  });

module.exports = mongoose.model("Cast", castSchema);