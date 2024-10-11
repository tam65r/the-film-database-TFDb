const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const FilmSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true },
    status: { type: String, required: true },
    release_date: { type: Date, required: true },
    revenue: { type: Number, required: true },
    runtime: { type: Number, required: true },
    adult: { type: Boolean, required: true },
    backdrop_path: { type: String },
    budget: { type: Number, required: true },
    homepage: { type: String },
    imdb_id: { type: String, required: true },
    original_language: { type: String, required: true },
    original_title: { type: String, required: true },
    overview: { type: String, required: true },
    popularity: { type: Number, required: true },
    poster_path: { type: String },
    tagline: { type: String },
    genres: { type: [String], required: true }, 
    production_companies: { type: [String], required: true },
    production_countries: { type: [String], required: true }, 
    spoken_languages: { type: [String], required: true }, 
    keywords: { type: [String], required: true }, 
  });
  

  module.exports = mongoose.model("Film", FilmSchema);