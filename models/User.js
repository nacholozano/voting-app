var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({

	username: String,
	email: {
		type: String,
		unique: true,
		validate: {
			validator: function (v) {
				return /^.+[@].+[.].+$/.test(v);
			},
			message: '{VALUE} is not a valid email!'
		}

	},
	hash: String,
	salt: String

});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');;
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
	var today = new Date();
	var exp = new Date(today); // equal dates
	exp.setDate(today.getDate() + 30); // get the day of the month + 30

	return jwt.sign({
		//payload that gets signed
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000) // expiration date in seconds
	}, process.env['SECRET']); // Sign

};

mongoose.model('User', UserSchema);
