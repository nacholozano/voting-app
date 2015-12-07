;
(function () {

	angular.module('votingApp')

	.controller('PollCtrl', ['$scope', '$state', '$stateParams', 'polls', PollCtrl]);

	function PollCtrl($scope, $state, $stateParams, polls) {

		$scope.poll = polls.getPoll( parseInt($stateParams.id) );

		// Delete poll
		$scope.deletePoll = function (pollId) {
			polls.deletePoll(pollId);
			$state.go('dashboard');
		};

		// Vote
		$scope.optionVoteId = 1;
		$scope.votePoll = function( pollId , optionVoteId ){
			polls.votePoll( pollId , optionVoteId );
		};

	};

})();
