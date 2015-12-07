;(function () {

	angular.module('votingApp')

	.controller('DashboardCtrl', ['$scope', 'polls','$compile', DashboardCtrl]);

	function DashboardCtrl($scope, polls,$compile) {

		/* Tabs */
		$scope.tab = 'newPoll';
		$scope.isSet = function (tab) {
			return $scope.tab === tab;
		};
		$scope.setTab = function (tab) {
			$scope.tab = tab;
		};


		/* Add option */
		$scope.options = [];

		var addOptionCounter = 2, // number of inputs (default: 2)
			newPollForm = angular.element('.options'); //get new poll form

		$scope.addOption = function () {
			// new input
			var newOption = "<div class='form-group'> <input required maxlength='70' class='form-control' type='text' id='inputSmall' placeholder='Option' ng-model='options[" + addOptionCounter + "]'> </div>";

			newPollForm.append($compile(newOption)($scope));

			addOptionCounter++;

		}

		/* New poll */
		$scope.createPoll = function () {

			polls.createPoll({
				author: 'nacho',
				name: $scope.pollName,
				date: 100,
				private: $scope.private,
				options: $scope.options,
				totalVotes: 0
			});

			// Reset form
			$scope.options = [];
			$scope.pollName = '';
			$scope.private = '';

		}

		/* My polls */
		$scope.myPolls = polls.polls;
		$scope.deletePoll = function(pollId){
			polls.deletePoll(pollId);
		};

	}

})();
