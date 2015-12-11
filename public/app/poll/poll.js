;
(function () {

	angular.module('votingApp')

	.controller('PollCtrl', ['$scope', 'auth', '$state', '$stateParams', 'polls', 'pollPromise', PollCtrl]);

	function PollCtrl($scope, auth, $state, $stateParams, polls, pollPromise) {

		$scope.poll = pollPromise.data;

		// Delete poll
		$scope.deletePoll = function () {
			polls.deletePoll($scope._id);
			$state.go('dashboard');
		};

		// Vote
		$scope.optionVoteId = '';
		$scope.votePoll = function () {
			polls.votePoll($scope.poll, $scope.optionVoteId)
				.error(function (error) {
					$scope.error = error;
				});
		};

	};

})();
