var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env['SECRET'],
	userProperty: 'payload'
});

// Get user's polls
router.get('/', auth, function (req, res, next) {

	var polls = Poll.find({
			author: req.payload._id
		})
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

		res.json(polls);

	});

});

// Get specific poll
router.get('/:poll', function (req, res, next) {

	res.json(req.poll);

});

// Vote poll
router.put('/:poll/vote/:option', auth, function (req, res, next) {

	req.poll.vote(req.payload._id, req.params.option, function (err, poll) {
		if (err) {
			return next(err);
		}

		res.json(poll);
	});

});

// Create poll
router.post('/create', auth, function (req, res, next) {

	var poll = new Poll(req.body);
	poll.author = req.payload._id;

	poll.save(function (err, poll) {
		if (err) {
			return next(err);
		}

		res.json(poll);

	});

});

// Delete poll
router.delete('/:id', auth, function (req, res, next) {

	var poll = Poll.remove({
		_id: req.params.id
	}, function (err, removed) {
		if (err) {
			return next(err);
		}
		res.json({
			message: 'Poll deleted'
		});
	});

});

///////////////// Params

// Poll param
router.param('poll', function (req, res, next, id) {
	var query = Poll.findById(id);

	query.exec(function (err, poll) {
		if (err) {
			return next(err);
		}
		if (!poll) {
			//return next(new Error('Cant find poll'))
			res.json({
				error: "Can't find poll"
			});
		}
		req.poll = poll;
		return next();
	});

});

module.exports = router;
