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

		var addOptionCounter = 2,
			newPollForm = angular.element('.options');

		$scope.addOption = function () {
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

			$scope.options = [];
			$scope.pollName = '';
			$scope.private = '';

		}

	}

})();
