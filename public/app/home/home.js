;(function(){

	angular.module('votingApp')

	.controller('HomeCtrl',['$scope','polls',HomeCtrl]);

	function HomeCtrl($scope,polls){

		var pollsNumber = 5;

		$scope.order = 'date';
		$scope.search = '';
		$scope.limit = pollsNumber;
		$scope.loadMore = function(){
			$scope.limit += pollsNumber;
		};

		$scope.polls = polls.polls;
		$scope.noPolls = polls.polls.length === 0 ? true : false ;

	}

})();
