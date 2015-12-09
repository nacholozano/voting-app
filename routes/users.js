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

	var data = req.body;

	if (!data.newPassword || !data.currentPassword) {
		return res.status(400).json({
			message: 'Please, fill out all the fields'
		});
	}

	User.findOne({
		_id: req.payload._id
	}, function (err, user) {

		if (err) {
			return next(err);
		}

		if (user.validPassword(data.currentPassword)) {

			user.setPassword(data.newPassword);

			user.save(function (err, user) {
				if (err) {
					return next(err);
				}
				return res.json({
					message: 'Password updated'
				});
			});

		} else {

			return res.status(401).json({
				message: 'Incorrect current password'
			});

		}

	});

});

module.exports = router;
