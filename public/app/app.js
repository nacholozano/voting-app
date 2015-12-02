var app = angular.module('votingApp', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/home/home.html',
				//controller: 'HomeCtrl',
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
		;

		$urlRouterProvider.otherwise('home');

    }
]);
