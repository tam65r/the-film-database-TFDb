const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
  id: { type: String, required: true },
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
}, { collection: 'films' });


const Film  = mongoose.model("Film", FilmSchema);


router.get('/search', async function(req, res, next) {
    const filmName = req.query.name;
    const filmRuntime = Number(req.query.runtime);

    let films;

    if (!filmRuntime && !filmName) {
      const error = new Error('Not a valid query');
      error.status = 400; 
      return next(error); 
    } else if (!filmRuntime) {
       films = await Film.find({"title": { $regex: filmName, $options: 'i' }});
    } else if(!filmName) {
       films = await Film.find({"runtime": {$lte: filmRuntime} });
    } else{
       films = await Film.find({"title": { $regex: filmName, $options: 'i' }, "runtime": {$lte: filmRuntime} });
    }

  

    res.json({
      'query': filmName + filmRuntime,
      'total_pages': 10,
      'current_page': 1,
      'films': films,
    });

});


router.get('/find/:film_id', async function(req, res, next) {
  const filmId = req.params.film_id; 

  const film = (await Film.find({"id": filmId})).at(0);

  if (!film) {
    const error = new Error(`Film with id ${filmId} not found`);
    error.status = 404; 
    return next(error); 
  }

  res.status(200).render('film', film);
});
 

module.exports = router;
