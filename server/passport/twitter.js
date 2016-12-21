var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');
var twitterConfig = require('../config/pspConfig').tw;

module.exports = function(passport) {
	
	passport.use('twitter', new TwitterStrategy ({
		consumerKey		: twitterConfig.apikey,
		consumerSecret	: twitterConfig.apisecret,
		callbackURL		: twitterConfig.callbackURL,
		profileFields : ['id', 'email', 'gender', 'link', 'name', 'picture.type(large)', 'friends']
	},
	function (access_token, refresh_token, profile, done){
		// Corre asincr�nico
		// findone no va a correr hasta que no tengamos toda la data de twitter
		process.nextTick ( function () {
			
			User.findOne ({ 'id' : profile.id }, function (err, user) {
				// si hay un error detengo y tiro el mismo
				if (err)
					return done(err);
				// si encuentro el usuario lo logeo
				if (user) {
					return done (null, user);
				} else {
					// si el usuario no existe lo creo en la db
					var newUser = new User();
					
					newUser.id			= profile.id;
					newUser.token		= access_token;
					newUser.firstName	= profile.username;
					newUser.lastName	= profile.displayName;
					newUser.lastStatus 	= profile._json.status.text;
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
				}
			});
		});
	}));
};