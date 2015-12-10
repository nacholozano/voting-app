;
(function () {

	'use strict';

	angular.module('votingApp')
		.controller('HeaderCtrl', ['auth', HeaderCtrl]);

	function HeaderCtrl(auth) {

		var vm = this;

		vm.logOut = auth.logOut;
		vm.isLoggedIn = auth.isLoggedIn;
		vm.currentUser = auth.currentUser;

	};

})();
