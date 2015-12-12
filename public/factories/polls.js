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

		/////////////////////// fn


		/**
		 * Create a poll
		 * @param   {JSON} newPoll New poll's data
		 * @returns {JSON} Error or poll just created
		 */
		function createPoll(newPoll) {
			return $http.post('/polls/create', newPoll, service.authToken)
				.success(function (poll) {
					service.polls.push(poll);
				});
		};

		/**
		 * Return current user's polls
		 * @returns {Array} Poll array
		 */
		function getAll() {
			return $http.get('/polls/', service.authToken)
				.success(function (polls) {
					angular.copy(polls, service.polls);
					//return polls;
				});
		};

		/**
		 * Delete poll
		 * @param   {ObjectId} pollId Poll's id
		 * @returns {JSON} Error or success message
		 */
		function deletePoll(pollId) {
			return $http.delete('/polls/' + pollId, service.authToken)
				.success(function () {
					var pollIndex = service.polls.findIndex(function (e) {
						return e._id === pollId;
					});
					service.polls.splice(pollIndex, 1);
				});
		};

		/**
		 * Get specific poll
		 * @param   {ObjectId} pollId Poll's id
		 * @returns {JSON} Returns error message or poll
		 */
		function getPoll(pollId) {
			return $http.get('/polls/' + pollId)
				.success(function (poll) {
					return poll;
				})
				.error(function (error) {
					return error;
				});
		};

		/**
		 * Vote poll
		 * @param   {ObjectId} pollId   Poll's id
		 * @param   {ObjectId} optionVoteId   Option's id to vote
		 * @returns {JSON} Error message or poll voted
		 */
		function votePoll(pollId, optionVoteId) {
			return $http.put('/polls/' + pollId + '/vote/' + optionVoteId, null, service.authToken);
		};

		/**
		 * Check if polls array is empty
		 * @returns {boolean}
		 */
		function isEmpty() {
			return service.polls.length === 0 ? true : false;
		}

	};

})();
