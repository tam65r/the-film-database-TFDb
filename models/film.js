const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CategorySchema = require("./category");

const CastSchema = require("./cast");

const FilmSchema = new Schema({
    film: {
        name: { type: String, required: true },
        id: { type: String, required: true },
        release: { type: Date, required: true },
        runtime: { type: Number, required: true },
        budget: { type: Number, required: true },
        revenue: { type: Number, required: true },
        vote_average: { type: Number, required: true },
        votes_count: { type: Number, required: true }
    },
    categories: [CategorySchema], 
    cast: [CastSchema]              
});

module.exports = mongoose.model("Movie", FilmSchema);