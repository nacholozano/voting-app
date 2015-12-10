;
(function () {

	angular.module('votingApp')
		.factory('polls', ['auth', '$http', polls]);

	function polls(auth, $http) {
		var service = {
			polls: []
		};

		/**
		 * Create new custom poll
		 * @param   {[[json object]]} newPoll {[[Object with new poll data]]}
		 * @returns {[[json object]]} [[Error or poll just created]]
		 */
		service.createPoll = function (newPoll) {
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
		service.getAll = function () {
			return $http.get('/polls', {
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			}).success(function (polls) {
				angular.copy(polls, service.polls);
			});
		};

		service.deletePoll = function (pollId) {
			return $http.delete('/' + pollId, {
				headers: {
					Authorization: 'Bearer ' + auth.getToken()
				}
			});
		};

		service.getPoll = function (pollId) {
			var poll = service.polls.find(function (e) {
				return e.id === pollId;
			});
			return poll;
		};

		service.votePoll = function (pollId, optionVoteId) {

			var pollIndex = service.polls.findIndex(function (e) {
				return e.id === pollId;
			});
			var optionIndex = service.polls[pollIndex].options.findIndex(function (e) {
				return e.id === optionVoteId;
			});

			service.polls[pollIndex].options[optionIndex].votes += 1;
			service.polls[pollIndex].totalVotes += 1;

		};

		return service;
	}

})();
