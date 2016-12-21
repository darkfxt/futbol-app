const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const userSchema = new Schema ({
		id: String,
		profilePic: String,
		username: String,
		firstName: String,
		lastName: String,
		zona: String,
		puntaje: String,
		reputacion: String,
		password: String,
		email: String,
		address: String,
		isUp: Boolean,
		createdOn: Date,
		modifiedOn: Date,
		access_token: String
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;