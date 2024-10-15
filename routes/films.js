const express = require('express');
const router = express.Router();

const Film  = require("../models/film");


router.get('/search', async function(req, res, next) {

  const filmName = req.query.name;
  const filmRuntime = parseInt(req.query.runtime) || null;
  const queryOperator = req.query.operator || 'eq';

  const page = parseInt(req.query.page) || 1;
  let aux = parseInt(req.query.limit) || 10;
  
  const limit = aux > 50 ? 50 : aux;

  const skip = (page - 1) * limit;
  
  const query = {};

  const operatorMapping = {
    eq: '$eq',
    gte: '$gte',
    lte: '$lte',
    gt: '$gt',
    lt: '$lt'
};

  if (filmName) {
      query.title = { $regex: filmName, $options: 'i' }; 
  }
  if (filmRuntime) {
      const operator = operatorMapping[queryOperator] || '$eq';
      query.runtime = { [operator]: filmRuntime }; 
  }

  if (Object.keys(query).length === 0) {
      const error = new Error('Not a valid query');
      error.status = 400;
      return next(error);
  }

  try {
      
    const totalCount = await Film.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    if (page > totalPages) {
      const error = new Error('Page');
      error.status = 400;
      throw error;
    }

    const films = await Film.find(query)
        .skip(skip)
        .limit(limit);

    res.render('films', {query: filmName || 'Not Specified', runtime: filmRuntime || 'Not Specified', total_pages: totalPages, page: page, limit: limit, items: films});
    /*res.json({
        query: filmName,
        runtime: filmRuntime,
        total_pages: totalPages,
        current_page: page,
        limit: limit,
        films: films,
    });*/
  } catch (err) {
      next(err);
  }
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
