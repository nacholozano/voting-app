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
					if ($scope.error.message === 'Incorrect password') {
						$scope.user.password = ''; // Incorrect password
					} else {
						$scope.user.email = ''; // Incorrect email
					}
				})
				.success(function () {
					$state.go('home');
				});

		};

		$scope.register = function () {
			auth.register($scope.user)
				.error(function (err) {
					$scope.error = err;
					$scope.user.email = ''; // Incorrect email
				})
				.success(function () {
					$state.go('home');
				});

		};

	};

})();