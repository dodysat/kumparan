const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redisDataInitialization = require('./modules/redisDataInitialization');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/articles', articlesRouter);

redisDataInitialization()

module.exports = app;
