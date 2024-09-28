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

module.exports = router;
  