const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use( session({
    secret:"78789689689790789689689798789",
    saveUninitialized: true,
    resave:true
  }));

app.use('/', indexRouter);

module.exports = app;
