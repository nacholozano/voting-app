;
(function () {

	'use strict';

	angular.module('votingApp')
		.factory('polls', ['auth', '$http', polls]);

	function polls(auth, $http) {
		var service = {
			polls: [],
			authToken: {
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			},
			createPoll: createPoll,
			getAll: getAll,
			deletePoll: deletePoll,
			getPoll: getPoll,
			votePoll: votePoll,
			isEmpty: isEmpty,
		};

		return service;

		///////////////////////

		function createPoll(newPoll) {
			return $http.post('/polls/create', newPoll, service.authToken)
				.success(function (poll) {
					service.polls.push(poll);
				});
		};

		function getAll() {
			return $http.get('/polls', service.authToken)
				.success(function (polls) {
					angular.copy(polls, service.polls);
					return polls;
				});
		};

		function deletePoll(pollId) {
			return $http.delete('/polls/' + pollId, service.authToken)
				.success(function (message) {
					var pollIndex = service.polls.findIndex(function (e) {
						return e.id === pollId;
					});
					service.polls.splice(pollIndex, 1);
				});
		};

		function getPoll(pollId) {
			return $http.get('/polls/' + pollId)
				.success(function (poll) {
					return poll;
				})
				.error(function (error) {
					return error;
				});
		};

		function votePoll(poll, optionVoteId) {
			return $http.put('/polls/' + poll._id + '/vote/' + optionVoteId, null, service.authToken);
		};

		function isEmpty() {
			return service.polls.length === 0 ? true : false;
		}

	};

})();
