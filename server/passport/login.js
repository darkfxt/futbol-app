var LocalStrategy = require ('passport-local').Strategy;
var User = require ('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
	passReqToCallback: true
	},

	function(req, email, password, done) {
		email == null ? email = req.query.email: email = email;
		console.log(email);
		console.log(req.body.email);
		console.log(req.body.password);
		// Chequear en la DB si existe email
		User.findOne({ 'email' :  email },
		function (err, user) {
			//En caso de error, hacer return usando done
			if (err)
				return done (err);
			//email no existe, logearlo y redirigir
			if (!user) {
				console.log('Usuario no encontrado con ese email '+ email);
				return done (null, false, req.flash('message', 'Usuario no encontrado'));
			}
			//El usuario existe pero la contraseña está Mal, loggearlo
			if (!isValidPassword(user, password)){
				console.log('Contraseña Inválida');
				return done (null, false, req.flash('message', 'Password Incorrecto'));
			}
			//Si todo está bien, devolver el usuario
			return done (null, user);
			}
		);
	}));
	
	var isValidPassword = function(user, password){

		return bCrypt.compareSync(password, user.password);
	}
	
}