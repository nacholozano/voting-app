;(function () {

	angular.module('votingApp')
		.factory('polls', polls);

	function polls() {
		var service = {
			polls: []
		};

		service.polls = [
			{
				id: 1,
				author: 'uno',
				name: 'dos',
				date: 2,
				private: false,
				options: [{
					name: 'a',
					votes: 2
				}, {
					name: 'b',
					votes: 5
				}, {
					name: 'c',
					votes: 5
				}],
				totalVotes: 12
			},
			{
				id: 2,
				author: 'uno',
				name: 'uno',
				date: 1,
				private: false,
				options: [{
					name: 'a',
					votes: 0
				}, {
					name: 'b',
					votes: 5
				}, {
					name: 'c',
					votes: 5
				}],
				totalVotes: 10
			}, {
				id: 3,
				author: 'uno',
				name: 'cinco',
				date: 48,
				private: false,
				options: [{
					name: 'a',
					votes: 2
				}, {
					name: 'b',
					votes: 5
				}],
				totalVotes: 7
			},
		];

		service.createPoll = function ( newPoll ) {
			service.polls.push(newPoll);
		};

		service.deletePoll = function( pollId ){
			var pollIndex = service.polls.findIndex(function(e){
				return e.id === pollId;
			});
			service.polls.splice(pollIndex, 1);
		};

		service.getPoll = function( pollId ){
			var poll = service.polls.find(function(e){
				return e.id === pollId;
			});
			return poll;
		};

		return service;
	}

})();
