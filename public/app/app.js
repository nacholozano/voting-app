;
(function () {

	'use strict';

	angular
		.module('votingApp', ['ui.router'])

	.config([
    '$stateProvider',
    '$urlRouterProvider',
		routing
]);

	function routing($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'home',
				resolve: {
					pollsPromise: ['polls', function (polls) {
						return polls.getAll();
					}]
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'login',
				onEnter: ['$state', 'auth', function ($state, auth) {
					if (auth.isLoggedIn()) {
						$state.go('home');
					}
				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/register/register.html',
				controller: 'RegisterCtrl',
				controllerAs: 'register',
				onEnter: ['$state', 'auth', function ($state, auth) {
					if (auth.isLoggedIn()) {
						$state.go('home');
					}
			}]
			})
			.state('settings', {
				url: '/settings',
				templateUrl: 'app/settings/settings.html',
				controller: 'SettingsCtrl',
				onEnter: ['$state', 'auth', function ($state, auth) {
					if (!auth.isLoggedIn()) {
						$state.go('home');
					}
				}]

			})
			.state('polls', {
				url: '/polls/:id',
				templateUrl: 'app/poll/poll.html',
				controller: 'PollCtrl',
			});


		$urlRouterProvider.otherwise('home');

	}

})();
