var mongoose = require('mongoose');

var Polls = new mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: String,
	options: [{
		option: String,
		votes: {
			type: Number,
			default: 0
		},
	}],
	totalVote: {
		type: Number,
		default: 0
	},
	voter: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]

});
