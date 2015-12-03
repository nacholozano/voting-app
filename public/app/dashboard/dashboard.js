var app = angular.module('votingApp');

app.controller('tabController',['$scope',function($scope){
	$scope.tab = 'newPoll';
	$scope.isSet = function(tab){
		return $scope.tab === tab;
	};
	$scope.setTab = function(tab){
		$scope.tab = tab;
	};
}]);
