;
(function () {

	angular.module('votingApp')

	.directive('myLoading', loading);

	function loading($rootScope, $timeout) {
		return {
			restrict: 'E',
			//replace: true,
			templateURL: 'loading.html',
			link: function (scope, elem, attrs) {

				scope.isRouteLoading = false;

				$rootScope.$on('$routeChangeStart', function () {
					scope.isRouteLoading = true;
				});

				$rootScope.$on('$routeChangeSuccess', function () {
					scope.isRouteLoading = false;
				});
			}
		};
	};

})();
