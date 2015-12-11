;
(function () {

	'use strict';

	angular.module('votingApp')

	.controller('HomeCtrl', ['polls', '$compile', 'auth', '$scope', HomeCtrl]);

	function HomeCtrl(polls, $compile, auth, $scope) {

		// Auth control
		$scope.isLoggedIn = auth.isLoggedIn;

		// Tabs
		$scope.tab = 'newPoll';
		$scope.isSet = function (tab) {
			return $scope.tab === tab;
		};
		$scope.setTab = function (tab) {
			$scope.tab = tab;
		};

		// Add option
		var addOptionCounter = 2, // number of inputs (default: 2)
			newPollForm = angular.element('.options'); //get new poll form

		$scope.addOption = function () {
			// new input
			var newOption = "<div class='form-group'> <input required maxlength='70' class='form-control' type='text' id='inputSmall' placeholder='Option' ng-model='newPoll.options[" + addOptionCounter + "].name'> </div>";

			newPollForm.append($compile(newOption)($scope));

			addOptionCounter++;
			/*$scope.newPoll.options.push({
				id: addOptionCounter
			});*/
		};

		//	New poll
		$scope.newPoll = {
			options: [
				/*{
								id: 1
							}, {
								id: 2
							}*/
				]
		};

		$scope.createPoll = function () {

			$scope.newPoll.date = new Date();

			polls.createPoll($scope.newPoll)
				.error(function (error) {
					$scope.error = error;
				})
				.success(function (poll) {
					$scope.poll = poll;
					$scope.noPolls = false;
				});

			// Reset form
			$scope.newPoll = {
				options: []
			};

		};

		//	Filters
		$scope.order = 'date';
		$scope.search = '';
		/*$scope.limit = 5;
$scope.loadMore = function () {
	$scope.limit += $scope.limit;
};*/

		//	My polls
		polls.getAll();
		$scope.myPolls = polls.polls;
		$scope.isEmpty = polls.isEmpty;

		$scope.deletePoll = function (pollId) {
			polls.deletePoll(pollId).success(function (message) {
				$scope.message = message.message;
			}).error(function (error) {
				$scope.error = error;
			});
		};

	};

})();
