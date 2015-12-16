var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Local

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function (email, password, done) {
		User.findOne({

			email: email

		}, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Incorrect email'
				});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Incorrect password'
				});
			}
			return done(null, user);
		});
	}
));


// Twitter

passport.use(new TwitterStrategy({
	consumerKey: 'MeMxvTO2YTM9dI2UWRGdyN5KY',
	consumerSecret: 'hIWYmoXnBFqxSCghzVDQK7XAIkQid61OaumK6HQUJrSNkar0Zc',
	callbackURL: 'https://votapp.herokuapp.com/login/twitter/return'
}, function (token, tokenSecret, profile, done) {
	//process.nextTick(function () {
	return done(null, profile);
	//});
}));
