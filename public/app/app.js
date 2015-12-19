;
(function () {


	'use strict';

	angular
		.module('votingApp', ['ui.router'])

	.config([
    '$stateProvider',
    '$urlRouterProvider',
		routing
	])

	.run(['$rootScope', '$state', function ($rootScope, $state, $timeout) {

		$rootScope.$on('$stateChangeStart', function () {
			$rootScope.stateIsLoading = true;
		});


		$rootScope.$on('$stateChangeSuccess', function () {
			$rootScope.stateIsLoading = false;
		});

	}]);

	function routing($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl',
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/login/login.html',
				controller: 'LoginCtrl',
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
			.state('poll', {
				url: '/polls/:poll',
				templateUrl: 'app/poll/poll.html',
				controller: 'PollCtrl',
				resolve: {
					pollPromise: ['polls', '$stateParams', function (polls, $stateParams) {
						return polls.getPoll($stateParams.poll)
							.then(function (poll) {
								return poll;
							}, function (err) {
								return err;
							});
					}]
				}
			});


		$urlRouterProvider.otherwise('home');

	}

})();
