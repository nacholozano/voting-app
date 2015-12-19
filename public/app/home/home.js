;
(function () {

	'use strict';

	angular.module('votingApp')

	.controller('HomeCtrl', ['polls', '$compile', 'auth', '$scope', HomeCtrl]);

	function HomeCtrl(polls, $compile, auth, $scope) {

		// Auth control
		$scope.isLoggedIn = auth.isLoggedIn;

		//	Get polls
		polls.getAll();
		$scope.myPolls = polls.polls;

		// Tabs
		$scope.tab = 'newPoll';
		$scope.isSet = function (tab) {
			return $scope.tab === tab;
		};
		$scope.setTab = function (tab) {
			$scope.tab = tab;
			$scope.message = '';
			$scope.poll = '';
			$scope.error = '';
		};

		// Add option
		var addOptionCounter = 2, // number of inputs (default: 2)
			newPollForm = angular.element('.options'); //get new poll form

		$scope.addOption = function () {
			// new input
			var newOption = "<div class='form-group'> <input required maxlength='70' class='form-control' type='text' id='inputSmall' placeholder='Option' ng-model='newPoll.options[" + addOptionCounter + "].name'> </div>";

			newPollForm.append($compile(newOption)($scope));

			addOptionCounter++;
		};


		//	New poll
		$scope.newPoll = {
			options: []
		};

		$scope.createPoll = function () {

			$scope.newPoll.date = new Date();

			polls.createPoll($scope.newPoll)
				.error(function (error) {
					$scope.error = error.message;
				})
				.success(function (poll) {
					$scope.poll = poll;
				});

			// Reset form
			$scope.newPoll = {
				options: []
			};

		};

		//	Filters
		$scope.order = '-date';
		$scope.search = '';

		// Delete poll
		$scope.pollToDelete = {};

		$scope.setDeleteId = function (id, name) {
			$scope.pollToDelete._id = id;
			$scope.pollToDelete.name = name;
		};

		$scope.deletePoll = function () {
			polls.deletePoll($scope.pollToDelete._id).success(function (message) {
				$scope.message = message.message;
			}).error(function (error) {
				$scope.error = error.message;
			});
		};

	};

})();
