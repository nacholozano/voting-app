;
(function () {

	'use strict';

	angular.module('votingApp')

	.controller('RegisterCtrl', ['$state', 'auth', LoginCtrl]);

	function LoginCtrl($state, auth) {

		var vm = this;

		vm.user = {};

		vm.register = function () {
			auth.register(vm.user)
				.error(function (err) {
					vm.error = err;
					vm.user.email = ''; // Incorrect email
				})
				.success(function () {
					$state.go('home');
				});

		};

	};

})();
