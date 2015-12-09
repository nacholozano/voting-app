var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env['SECRET'],
	userProperty: 'payload'
});
/*
router.params('', function (req, res, next, number) {

})
*/

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

// Get polls
router.get('/polls/:limit', function (req, res, next, limit) {
	/*
		var query = Poll.find({
				private: false
			})
			.limit(limit)
			.select({
				name: 1,
				data: 1,
			});

		query.exec(function (err, person) {
			if (err) return handleError(err);

		})
	*/
});

module.exports = router;
