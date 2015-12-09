var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env['SECRET'],
	userProperty: 'payload'
});

Poll.remove({}, function (err) {
	console.log('collection removed')
});

// Get polls
router.get('/', auth, function (req, res, next) {

	var polls = Poll.find({})
		.limit(req.params.limit)
		.sort({
			date: -1
		});

	polls.exec(function (err, polls) {
		if (err) {
			return next(err);
		}
		if (!polls) {
			return next(new Error("No polls"));
		}

		return res.json(polls);

	});

});

// Create poll
router.post('/create', auth, function (req, res, next) {

	var poll = new Poll(req.body);
	poll.author = req.payload._id;

	poll.save(function (err, poll) {
		if (err) {
			next(err);
		}

		return res.json(poll);

	});

});


module.exports = router;
