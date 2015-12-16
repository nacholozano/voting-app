;
(function () {

	angular.module('votingApp')

	.controller('PollCtrl', ['$scope', 'auth', '$state', '$stateParams', 'polls', 'pollPromise', PollCtrl]);

	function PollCtrl($scope, auth, $state, $stateParams, polls, pollPromise) {

		$scope.poll = pollPromise.data;

		// Delete poll
		$scope.deletePoll = function () {
			polls.deletePoll($scope.poll._id).success(function (message) {
				$scope.poll = '';
				$scope.message = message.message;
			}).error(function (error) {
				$scope.error = error.message;
			});
		};

		// Vote
		$scope.optionVoteId = '';

		$scope.votePoll = function () {
			polls.votePoll($scope.poll._id, $scope.optionVoteId)
				.error(function (error) {
					$scope.error = error.message;
				}).success(function (poll) {
					$scope.poll = poll;
				});
		};

		// Check if poll is voted by current user
		$scope.pollVoted = function () {
			return $scope.poll.voters.find(function (voter) {
				return voter.toString() === auth.currentUser()._id.toString();
			});
		};

		/// chekc if current user is poll author
		$scope.isAuthor = function () {
			return $scope.poll.author.toString() === auth.currentUser()._id.toString();
		};

	};

})();
