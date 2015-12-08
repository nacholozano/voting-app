;
(function () {

	angular.module('votingApp')

	.controller('AuthCtrl', ['$scope', '$state', 'auth', LoginCtrl]);

	function LoginCtrl($scope, $state, auth) {

		$scope.user = {};

		$scope.login = function () {
			auth.login($scope.user)
				.error(function (err) {
					$scope.error = err;
				})
				.then(function () {
					$state.go('home');
				});

		};

		$scope.register = function () {
			auth.register($scope.user)
				.error(function (err) {
					$scope.error = err;
				})
				.then(function () {
					$state.go('home');
				});

		};

	};

})();
