/**
 * Created by MATIASJ on 8/11/2016.
 */
var config = require('../config/config');


var express = require('express'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    Promise = require('bluebird'),
    flash = require('connect-flash'),
    app = express();

mongoose.Promise = Promise;

mongoose.connect(config.URI_DB, function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

/* Vistas y puertos */

if (app.get('env') === 'development') app.locals.pretty = true;
app.set('views', path.join(config.rootPath, 'views'));
app.use(express.static(path.join(config.rootPath, 'app')));
app.set('view engine', 'ejs');
app.set("view options", { layout: "commons/layout.ejs" });
app.set('port', config.port);

app.use(logger('dev'));

app.use(function (req, res, next) {
    res.locals.config = config;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuring Passport
var passport = require('passport');
app.use(session({ secret: 'ys1h4c3m05unfulb1t0?' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('../passport/init');
initPassport(passport);

var apirouter = require ('../api-router')(passport);
app.use('/' , apirouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Manejador de error de producción, sin trazas al usuario
if(app.get('env') !== "development"){
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send( {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;