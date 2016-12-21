var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
	
	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) {
		
		findOrCreateUser = function(){
			// Verificar si el usuario existe en Mongo por su email
			User.findOne({ 'email' :  req.body.email }, function( err, user ) {
				// Manejo errores
				if(err){
					console.log('Error en el Registro: '+err);
					return done (err);
				}
				// Ya existe
				if (user) {
					console.log('Ya existe un usuario con esa dirección de correo');
					return done (null,false, req.flash('message', 'Ya existe ese usuario'));
				} else {
					// Si no existe crearlo
					var newUser = new User();
					
					// Generar las Credenciales "Locales" del usuario
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.email = req.body.email;
					newUser.firstName = req.body.firstName; // req.param('firstName');
					newUser.lastName = req.body.lastName; //req.param('lastName');
					newUser.access_token = req.body.access_token;
					newUser.profilePic = req.body.profilePic;
					newUser.id = req.body.face_id;
					// Guardar en DB
					newUser.save(function(err){
						if(err){
							console.log('Error guardando el usuario: '+err);
							throw err;
						}
						console.log('El registro del usuario fue exitoso'+newUser);
						return done (null, newUser);
					});
				}
				});
			};
			process.nextTick(findOrCreateUser);
		})
	);
	
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}