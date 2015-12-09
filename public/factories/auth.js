;
(function () {

	angular.module('votingApp')
		.factory('auth', ['$http', '$window', '$state', auth]);

	function auth($http, $window, $state) {

		var service = {};

		service.saveToken = function (token) {
			$window.localStorage['voting-app-token'] = token;
		};

		service.getToken = function () {
			return $window.localStorage['voting-app-token'];
		};

		service.isLoggedIn = function () {
			var token = service.getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}

		};

		service.currentUser = function () {
			if (service.isLoggedIn()) {
				var token = service.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload;
			}
		};

		service.register = function (user) {
			return $http.post('/user/register', user).success(function (data) {
				service.saveToken(data.token);
			});
		};

		service.login = function (user) {
			return $http.post('/user/login', user).success(function (data) {
				service.saveToken(data.token);
			});
		};

		service.logOut = function () {
			$window.localStorage.removeItem('voting-app-token');
			$state.go('home');
		};

		service.update = function (data) {

			return $http.put('/user/update', data, {
				headers: {
					Authorization: 'Bearer ' + service.getToken()
				}
			});

		};

		return service;
	};

})();
