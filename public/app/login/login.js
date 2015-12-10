;
(function () {

	'use strict';

	angular.module('votingApp')

	.controller('LoginCtrl', ['$state', 'auth', LoginCtrl]);

	function LoginCtrl($state, auth) {

		var vm = this;

		vm.user = {};

		vm.login = function () {
			auth.login(vm.user)
				.error(function (err) {
					vm.error = err;
					console.log(vm.error);
					if (vm.error.message === 'Incorrect password') {
						vm.user.password = ''; // Incorrect password
					} else {
						vm.user.email = ''; // Incorrect email
					}
				})
				.success(function () {
					$state.go('home');
				});

		};

	};

})();
