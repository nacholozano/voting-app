;
(function () {

	'use strict';

	angular.module('votingApp')

	.controller('LoginCtrl', ['$scope', '$state', 'auth', LoginCtrl]);

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

	};

})();
