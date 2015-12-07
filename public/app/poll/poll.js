;
(function () {

	angular.module('votingApp')

	.controller('PollCtrl', ['$scope','$state','$stateParams', 'polls', PollCtrl]);

	function PollCtrl($scope,$state ,$stateParams, polls) {

		$scope.poll = polls.getPoll(parseInt($stateParams.id));
		$scope.deletePoll = function( pollId ){
			polls.deletePoll(pollId);
			$state.go('dashboard');
		};

	};

})();
