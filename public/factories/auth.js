;
(function () {

	'use strict';

	angular.module('votingApp')
		.factory('auth', ['$http', '$window', '$state', auth]);

	function auth($http, $window, $state) {

		var service = {
			saveToken: saveToken,
			getToken: getToken,
			isLoggedIn: isLoggedIn,
			currentUser: currentUser,
			register: register,
			login: login,
			logOut: logOut,
			update: update,
		};

		return service;

		//////////////////////////

		function saveToken(token) {
			$window.localStorage['voting-app-token'] = token;
		};

		function getToken() {
			return $window.localStorage['voting-app-token'];
		};

		function isLoggedIn() {
			var token = service.getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}

		};

		function currentUser() {
			if (service.isLoggedIn()) {
				var token = service.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload;
			}
		};

		function register(user) {
			return $http.post('/user/register', user).success(function (data) {
				service.saveToken(data.token);
			});
		};

		function login(user) {
			return $http.post('/user/login', user).success(function (data) {
				service.saveToken(data.token);
			});
		};

		function logOut() {
			$window.localStorage.removeItem('voting-app-token');
			$state.go('home');
		};

		function update(data) {
			return $http.put('/user/update', data, {
				headers: {
					Authorization: 'Bearer ' + service.getToken()
				}
			});
		};

	};

})();
