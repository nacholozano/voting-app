;
(function () {

	angular.module('votingApp')

	.controller('HomeCtrl', ['$scope', 'polls', '$compile', 'auth', DashboardCtrl]);

	function DashboardCtrl($scope, polls, $compile, auth) {

		$scope.isLoggedIn = auth.isLoggedIn;

		/* Tabs */
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
		};

		/* New poll */
		$scope.newPoll = {
			options: []
		};

		$scope.createPoll = function () {

			$scope.newPoll.date = new Date();

			polls.createPoll($scope.newPoll)
				.error(function (error) {
					$scope.error = error;
				})
				.success(function (poll) {
					$scope.poll = poll;
				});

			// Reset form
			$scope.newPoll = {
				options: []
			};

		}

		/* My polls */

		$scope.noPolls = polls.polls.length === 0 ? true : false;
		$scope.myPolls = polls.polls;
		$scope.deletePoll = function (pollId) {
			polls.deletePoll(pollId);
			$scope.noPolls = polls.polls.length === 0 ? true : false;
		};

		/* Filters */
		$scope.order = 'date';
		$scope.search = '';
		$scope.limit = 5;
		$scope.loadMore = function () {
			$scope.limit += $scope.limit;
		};

	}

})();
