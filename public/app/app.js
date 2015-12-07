;(function () {
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
				/*resolve: {
						postPromise: ['posts', function (posts) {
							return posts.getAll();
                }]
					}*/
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/sign/login.html',
				controller: 'AuthCtrl',
			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/sign/register.html',
				controller: 'AuthCtrl',
			})
			.state('settings', {
				url: '/settings',
				templateUrl: 'app/settings/settings.html',
				//controller: 'HomeCtrl',

			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'app/dashboard/dashboard.html',
				controller: 'DashboardCtrl',

			})
			/*.state('poll', {
				url: '/poll',
				templateUrl: 'app/poll/poll.html',
				//controller: 'HomeCtrl',

			})*/
			.state('polls', {
				url: '/polls/:id',
				templateUrl: 'app/poll/poll.html',
				controller: 'PollCtrl',

			});


		$urlRouterProvider.otherwise('home');

	}

})();
