;
(function () {
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
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/sign/login.html',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function ($state, auth) {
					if (auth.isLoggedIn()) {
						$state.go('home');
					}
				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/sign/register.html',
				controller: 'AuthCtrl',
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
