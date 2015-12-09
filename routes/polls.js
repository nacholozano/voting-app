var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Polls = mongoose.model('Poll');
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env['SECRET'],
	userProperty: 'payload'
});
/*
router.params('', function (req, res, next, number) {

})
*/
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
/*
user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	private: Boolean,
	date: Date,
	name: String,
	options: [{
		id: Number,
		option: String,
		votes: {
			type: Number,
			default: 0
		}
				}],
	totalVote: {
		type: Number,
		default: 0
	},
	voters: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
						}]*/
