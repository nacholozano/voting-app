;
(function () {
	angular.module('votingApp').
	controller('SettingsCtrl', ['$scope', 'auth', SettingsCtrl]);

	function SettingsCtrl($scope, auth) {

		$scope.data = {
			username: auth.currentUser().email
		};
		$scope.user = auth.currentUser();
		$scope.update = function () {

			auth.update($scope.data);

		};

	};

})();
