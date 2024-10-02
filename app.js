var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const moviesRouter = require('./routes/movies');

const errorHandler = require('./public/javascripts/errorHandlerMiddleware');

var app = express();

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TFDb');
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);


app.use(errorHandler);



module.exports = app;
