;
(function () {

	angular.module('votingApp')

	.controller('PollCtrl', ['$scope', 'auth', '$state', '$stateParams', 'polls', 'pollPromise', PollCtrl]);

	function PollCtrl($scope, auth, $state, $stateParams, polls, pollPromise) {

		$scope.poll = pollPromise.data;

		// Delete poll
		$scope.deletePoll = function () {
			polls.deletePoll($scope.poll._id);
			$state.go('home');
		};

		// Vote
		$scope.optionVoteId = '';
		$scope.votePoll = function () {
			polls.votePoll($scope.poll, $scope.optionVoteId)
				.error(function (error) {
					$scope.error = error;
				}).success(function (poll) {
					$scope.poll = poll;
				});
		};

		$scope.pollVoted = function () {
			return $scope.poll.voters.find(function (voter) {
				return voter.toString() === auth.currentUser()._id.toString();
			});
		};

		$scope.isAuthor = function () {
			return $scope.poll.author.toString() === auth.currentUser()._id.toString();
		};

	};

})();
