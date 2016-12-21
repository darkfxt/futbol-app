var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var fbConfig = require('../config/pspConfig').fb;

module.exports = function(passport) {
console.log(fbConfig);
	passport.use('facebook', new FacebookStrategy({
		clientID	: fbConfig.appID,
		clientSecret: fbConfig.appSecret,
		callbackURL	: fbConfig.callbackURL,
		profileFields : ['id', 'email', 'gender', 'link', 'name', 'picture.type(large)', 'friends'],
		enableProof	: true
	},
	
	// facebook devuelve el perfil y los tokens
	function (access_token, refresh_token, profile, done){
		
		console.log('profile', profile);
		
			// asincr�nico
			process.nextTick (function () {
				
			// Encontrar el usuario en la base de datos seg�n su facebook id
				User.findOne ({ 'id' : profile.id }, function (err, user) {
					
					// Si hubo un error detengo todo y tiro el error
					if (err)
						return done(err);
						
					// si encuentro usuario en la DB
					if (user) {
							return done (null, user);
					} else {
						var newUser = new User();
						// completo el modelo con la informaci�n de fb
						newUser.id = profile.id;
						newUser.access_token = access_token;
						newUser.firstName = profile.name.givenName;
						newUser.lastName = profile.name.familyName;
						if (typeof profile.photos !== 'undefined'){	newUser.profilePic = profile.photos[0].value; }
						
						// Verifico si el profile me devuelve alg�n email
						if (typeof profile.emails !== 'undefined' ){
							// Si el profile me trae definido el email, lo guardo en la DB
							newUser.email = profile.emails[0].value;
							newUser.save(function(err){
								if (err)
									throw err;
								// Si todo sali� bien, devuelvo el nuevo usuario
								return done (null, newUser);
							});
						} else {
						// Si el profile no me devolvi� el email, 
						// devuelvo los datos que tengo al router para que lo maneje �l
						console.log("el usuario vino sin email, completalo en signup!");
							return done (null, newUser);
						}
				}});
			});
	}));
};