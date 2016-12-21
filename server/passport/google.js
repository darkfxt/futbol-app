var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var gConfig = require('../config/pspConfig').gp;

module.exports = function(passport) {
	
	passport.use( new GoogleStrategy({
		clientID	: gConfig.clientID,
		clientSecret: gConfig.clientSecret,
		callbackURL	: gConfig.callbackUrl,
		profileFields : ['id', 'email', 'gender', 'link', 'name', 'picture.type(large)', 'friends']
	},
	
	// facebook devuelve el perfil y los tokens
	function (access_token, refresh_token, profile, done){
		
		console.log('profile', profile);
		
			// asincr�nico
			process.nextTick (function () {
				
			// Encontrar el usuario en la base de datos seg�n su google id
				User.findOne ({ 'id' : profile.id }, function (err, user) {
					
					// Si hubo un error detengo todo y tiro el error
					if (err)
						return done(err);
					// si encuentro usuario entonces lo logeo
					if (user) {
						return done (null, user);
					} else {
						User.findOne( { 'email' : profile.emails[0].value }, 
							function ( err, user ){
								if (err)
									return done (err);
								if (user) {
									return done (null, user);
								} else {
									// Si no hay usuario con ese id lo creo en la db
									var newUser = new User();
									// completo el modelo con la informaci�n de google
									newUser.id = profile.id;
									newUser.access_token = access_token;
									newUser.firstName = profile.name.givenName;
									newUser.lastName = profile.name.familyName;
									if (typeof profile.photos !== 'undefined'){
										newUser.profilePic = profile.photos[0].value;
									}
									newUser.email = profile.emails[0].value;
									
									// guardamos el usuario en la db
									newUser.save(function(err){
										if (err)
											//throw err;
											//return done (err);
											return done (null, false, req.flash('message', 'Ya existe ese usuario'));
										
										// Si todo sali� bien, devuelvo el nuevo usuario
										return done (null, newUser);
									});
								}
							} )
						/*// Si no hay usuario con ese id lo creo en la db
						var newUser = new User();
						// completo el modelo con la informaci�n de google
						newUser.id = profile.id;
						newUser.access_token = access_token;
						newUser.firstName = profile.name.givenName;
						newUser.lastName = profile.name.familyName;
						if (typeof profile.photos !== 'undefined'){
							newUser.profilePic = profile.photos[0].value;
						}
						newUser.email = profile.emails[0].value;
						
						// guardamos el usuario en la db
						newUser.save(function(err){
							if (err)
								//throw err;
								//return done (err);
								return done (null, false, req.flash('message', 'Ya existe ese usuario'));
							
							// Si todo sali� bien, devuelvo el nuevo usuario
							return done (null, newUser);
						});*/
					}
				});
			});
	}));
};