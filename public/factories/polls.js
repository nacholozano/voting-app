;
(function () {

	'use strict';

	angular.module('votingApp')
		.factory('polls', ['auth', '$http', polls]);

	function polls(auth, $http) {
		var service = {
			polls: [],
			createPoll: createPoll,
			getAll: getAll,
			deletePoll: deletePoll,
			getPoll: getPoll,
			votePoll: votePoll,
		};

		return service;

		///////////////////////

		/**
		 * Create new custom poll
		 * @param   {[[json object]]} newPoll {[[Object with new poll data]]}
		 * @returns {[[json object]]} [[Error or poll just created]]
		 */
		function createPoll(newPoll) {
			return $http.post('/polls/create', newPoll, {
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			}).success(function (poll) {
				service.polls.push(poll);
			});
		};

		/**
		 * Get all polls
		 */
		function getAll() {
			return $http.get('/polls', {
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			}).success(function (polls) {
				angular.copy(polls, service.polls);
			});
		};

		function deletePoll(pollId) {
			return $http.delete('/polls/' + pollId, {
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			}).success(function (message) {
				var pollIndex = service.polls.findIndex(function (e) {
					return e.id === pollId;
				});
				service.polls.splice(pollIndex, 1);
			});
		};

		function getPoll(pollId) {
			var poll = service.polls.find(function (e) {
				return e.id === pollId;
			});
			return poll;
		};

		function votePoll(pollId, optionVoteId) {

			var pollIndex = service.polls.findIndex(function (e) {
				return e.id === pollId;
			});
			var optionIndex = service.polls[pollIndex].options.findIndex(function (e) {
				return e.id === optionVoteId;
			});

			service.polls[pollIndex].options[optionIndex].votes += 1;
			service.polls[pollIndex].totalVotes += 1;

		};

	}

})();
