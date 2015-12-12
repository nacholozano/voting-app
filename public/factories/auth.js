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

		////////////////////////// fn

		/**
		 * Save JWT in local storage
		 * @param {JSON} token JWT returned by the server
		 */
		function saveToken(token) {
			$window.localStorage['voting-app-token'] = token;
		};

		/**
		 * Retrieve the JWT from local storage
		 * @returns {JSON} Returns JWT
		 */
		function getToken() {
			return $window.localStorage['voting-app-token'];
		};

		/**
		 * Check if the user is logged in
		 * Check the expiration date
		 * @returns {boolean}
		 */
		function isLoggedIn() {
			var token = service.getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}

		};

		/**
		 * Get current user's info
		 * @returns {JSON} Returns JWT (it contains user's info)
		 */
		function currentUser() {
			if (service.isLoggedIn()) {
				var token = service.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload;
			}
		};

		/**
		 * Register an user
		 * Save JWT if success
		 * @param   {JSON} user User's info to register (name,email and password)
		 * @returns {JSON} Returns JWT or error message
		 */
		function register(user) {
			return $http.post('/user/register', user)
				.success(function (data) {
					service.saveToken(data.token);
				});
		};

		/**
		 * Login an user
		 * Save JWT if success
		 * @param   {JSON} user JSON with user's info (email and password)
		 * @returns {JSON} Returns JWT or error message
		 */
		function login(user) {
			return $http.post('/user/login', user)
				.success(function (data) {
					service.saveToken(data.token);
				});
		};

		/**
		 * Log Out
		 * Remove JWT from local storage
		 */
		function logOut() {
			$window.localStorage.removeItem('voting-app-token');
			$state.go('home');
		};

		/**
		 * Update user's profile
		 * @param   {JSON} data New user's data (Nowdays, it just changes user's password )
		 * @returns {JSON} Returns error or success message
		 */
		function update(data) {
			return $http.put('/user/update', data, {
				headers: {
					Authorization: 'Bearer ' + service.getToken()
				}
			});
		};

	};

})();
