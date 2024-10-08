const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Movie  = require('../models/film');


router.get('/search', async function(req, res, next) {
    const movieName = req.query.name;
    const movieRuntime = req.query.runtime;

    let movies;

    if (!movieRuntime && !movieName) {
      const error = new Error('Not a valid query');
      error.status = 400; 
      return next(error); 
    } else if (!movieRuntime) {
       movies = await Movie.find({"film.name": { $regex: movieName, $options: 'i' }});
    } else if(!movieName) {
       movies = await Movie.find({"film.runtime": {$lte: Number(movieRuntime)} });
    } else{
       movies = await Movie.find({"film.name": { $regex: movieName, $options: 'i' }, "film.runtime": {$lte: Number(movieRuntime)} });
    }

 
    
    const films = [];
    
    movies.forEach(film => {
      films.push(film.film);
    });

    res.json({
      'query': movieName + movieRuntime,
      'total_pages': 10,
      'current_page': 1,
      'movies': films,
    });

});


router.get('/search2', async function(req, res, next) {
  const temp = parseInt(req.query.name);
  
  const movies = await Movie.find({ "film.runtime": {$lte: temp}  });
  console.log(movies)
  const films = [];
  
  movies.forEach(film => {
    films.push(film.film);
  });


  res.json({
    'query': temp,
    'total_pages': 10,
    'current_page': 1,
    'movies': films,
  });

});





router.get('/find/:movie_id', async function(req, res, next) {
  const movieId = req.params.movie_id; 

  const movie = (await Movie.find({"film.id": movieId})).at(0);

  if (!movie) {
    const error = new Error(`Movie with id ${movieId} not found`);
    error.status = 404; 
    return next(error); 
  }

  res.status(200).render('movie', movie);
});
 

module.exports = router;
