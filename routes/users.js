var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env['SECRET'],
	userProperty: 'payload'
});

/*User.remove({}, function (err) {
	console.log('collection removed')
});*/

// Register user
router.post('/register', function (req, res, next) {

	var data = req.body;

	if (!data.username || !data.password || !data.email) {
		return res.status(400).json({
			message: 'Please, fill out all the fields'
		});
	}

	var user = new User();
	user.username = data.username;
	user.email = data.email;
	user.setPassword(data.password);

	user.save(function (err) {
		if (err) return next(err);

		return res.json({
			token: user.generateJWT()
		});

	});

});

// Login user
router.post('/login', function (req, res, next) {

	var data = req.body;

	console.log(data);

	if (!data.email || !data.password) {
		return res.status(400).json({
			message: 'Please, fill out all the fields'
		});
	}

	passport.authenticate('local', function (err, user, info) {
		if (err) return next(err);

		if (user) {
			return res.json({
				token: user.generateJWT()
			});
		} else {
			return res.status(401).json(info);
		}

	})(req, res, next);

});

// Update user
router.put('/update', auth, function (req, res, next) {

	/*var data = req.body;

	console.log(data);
	console.log(req.payload);

	if (!data.newPassword || !data.currentPassword) {
		return res.status(400).json({
			message: 'Please, fill out all the fields'
		});
	}

	var salt = crypto.randomBytes(16).toString('hex');
	var hash = crypto.pbkdf2Sync(data.newPassword, salt, 1000, 64).toString('hex');

	User.update({
		_id: req.payload._id
	}, {
		$set: {
			hash: hash
		}
	}, function (err, raw) {
		if (err) return handleError(err);
		console.log('The raw response from Mongo was ', raw);
	});*/

});

module.exports = router;
