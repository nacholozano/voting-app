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
				/*resolve: {
						postPromise: ['posts', function (posts) {
							return posts.getAll();
                }]
					}*/
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/login/login.html',
				//controller: 'HomeCtrl',

			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/register/register.html',
				//controller: 'HomeCtrl',

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
			.state('poll', {
				url: '/poll',
				templateUrl: 'app/poll/poll.html',
				//controller: 'HomeCtrl',

			});


		$urlRouterProvider.otherwise('home');

	}

})();
