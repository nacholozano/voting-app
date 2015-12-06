;(function () {

	angular.module('votingApp')
		.factory('polls', polls);

	function polls() {
		var service = {
			polls: []
		};

		service.polls = [
			{
				author: 'uno',
				name: 'dos',
				date: 2,
				private: false,
				options: [{
					option: 'a',
					vote: 2
				}, {
					option: 'b',
					vote: 5
				}, {
					option: 'c',
					vote: 5
				}],
				totalVotes: 5
			},
			{
				author: 'uno',
				name: 'uno',
				date: 1,
				private: false,
				options: [{
					option: 'a',
					vote: 2
				}, {
					option: 'b',
					vote: 5
				}, {
					option: 'c',
					vote: 5
				}],
				totalVotes: 12
			}, {
				author: 'uno',
				name: 'cinco',
				date: 48,
				private: false,
				options: [{
					option: 'a',
					vote: 2
				}, {
					option: 'b',
					vote: 5
				}, {
					option: 'c',
					vote: 5
				}],
				totalVotes: 30
			},
		];

		service.createPoll = function ( newPoll ) {
			service.polls.push(newPoll);
		};

		return service;
	}

})();
