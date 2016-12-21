/**
 * Created by MATIASJ on 14/12/2016.
 */
var express = require ('express');
var app = express();
var Router = express.Router();
var User = require('./models/user');
var bCrypt = require('bcrypt-nodejs');
var session = require('express-session');
var flash = require('connect-flash');

/*var passport = require('passport');
app.use(session({ secret: 'ys1h4c3m05unfulb1t0?' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);*/

function loginUser( req , res ) {

};

function findAllUsers ( res ){
    User.find ( function (err, users){
        // Si encuentro un error devuelvo cod500 y el mensaje de error
        if( err )
            res.send( 500, err.message );
        // Si encuentro usuarios, los devuelvo en formato json con cod200
        console.log('GET /api/users');
        res.status( 200 ).jsonp( users );
    })
}

function findUserByMail ( req, res ){
    User.find({'email': req.params.email }, function ( err, usuario ){
        if ( err )
            res.send(500, err.message );

        console.log( 'Buscando por email' );
        res.status(200).jsonp(usuario);
    })
}

function findHotelById ( req, res ){
    hotelsList.findById( req.params.id, function ( err, hotel ){
        if ( err )
            res.send(500, err.message );

        console.log( 'GET /api/hotel/' + req.params.id );
        res.status(200).jsonp(hotel);
    })
}

//POST - Agregar hotel
function addHotel (req, res) {
    console.log('POST');
    console.log(req.body);

    var hotel = new hotelsList({
        name:    req.body.name,
        stars: 	  req.body.stars,
        price:  req.body.price,
        imagenes: req.body.imagenes,
        amenities: req.body.amenities,
        regimen: req.body.regimen,
        decorators: req.body.decorators
    });

    hotel.save( function( err, hotelNew ) {
        if(err)
            return res.send(500, err.message);

        res.status(200).jsonp(hotelNew);
    });
}


module.exports = function ( passport ) {

    Router.get('/home', function( req, res ){
        res.send("Hello world!");
    });
    // *** Rutas de mi API ***
    Router.get('/api/login', function ( req, res ) {
        console.log(req.body.email);
    });
    Router.post('/api/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));

    Router.get('/api/users', function (req, res){
        findAllUsers( res );
    });
    Router.get('/api/user/:email', function (req, res){
        findUserByMail( req, res );
    });


    /* Manejar Logout */
    Router.get('/api/signout', function (req, res){
        req.logout();
        res.redirect('/');
    });

    Router.get('/login/google',
        passport.authenticate('google', { scope : ['profile', 'email']}
        ));

    Router.get('/login/google/callback',
        passport.authenticate('google', {
            failureRedirect : '/',
            failureFlash: true
        }),
        function (req, res) {
            res.redirect('/home');
        });

    return Router;
};