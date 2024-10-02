const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Movie  = require('../models/film');


router.get('/movies', async function(req, res, next) {
    try {
        const movies = await Movie.find(); 
        console.log('success');
        res.send(movies);
      } catch (error) {
        res.send('ERROR');
      }

});

router.get('/movie', async function(req, res, next) {
    try {
        const movies = await Movie.find({"film.name": 'Beverly Hills Cop'});
        console.log('success');
        res.send(movies);
      } catch (error) {
        res.send('ERROR');
      }

});


router.get('/search', async function(req, res) {
  let page = req.query.page;

  if (page == undefined) {
    page = 1;
  }

  let limit = req.query.limit;

  res.status(200).send({ page: page });
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
