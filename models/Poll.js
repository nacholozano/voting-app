var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: Date,
	name: String,
	options: [{
		//id: Number,
		name: String,
		option: String,
		votes: {
			type: Number,
			default: 0
		}
	}],
	totalVotes: {
		type: Number,
		default: 0
	},
	voters: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]

});

PollSchema.methods.vote = function (voterId, optionId, callback) {

	var optionIndex = this.options.map(function (option) {
		return option._id.toString();
	}).indexOf(optionId.toString());

	this.options[optionIndex].votes += 1;
	this.totalVotes += 1;
	this.voters.push(voterId);
	this.save(callback);
};

mongoose.model('Poll', PollSchema);
