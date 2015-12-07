var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({

	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
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
	}]

});

PollSchema.methods.vote = function(voterId,optionId){
	//var optionIndex = this.options.findIndex({ id: optionId });
	this.options[optionIndex].votes += 1;
	this.totalVotes += 1;
	this.voters.push(voterId);
};

mongoose.model('Poll', PollSchema);
