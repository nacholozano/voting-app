;
(function () {

	'use strict';

	angular.module('votingApp')

	.controller('RegisterCtrl', ['$scope', '$state', 'auth', LoginCtrl]);

	function LoginCtrl($scope, $state, auth) {

		$scope.user = {};

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
