;
(function () {

	angular.module('votingApp')
		.controller('HeaderCtrl', ['$scope', 'auth', HeaderCtrl]);

	function HeaderCtrl($scope, auth) {

		$scope.logOut = auth.logOut;
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;

	};

})();
