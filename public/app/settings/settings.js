;
(function () {
	angular.module('votingApp').
	controller('SettingsCtrl', ['$scope', 'auth', SettingsCtrl]);

	function SettingsCtrl($scope, auth) {

		$scope.data = {};

		$scope.update = function () {

			auth.update($scope.data)
				.error(function (error) {
					$scope.success = '';
					$scope.error = error;
					if ($scope.error.message === 'Incorrect current password') {
						$scope.data.currentPassword = '';
					}
				})
				.success(function (data) {
					$scope.error = '';
					$scope.success = data;
					$scope.data = {};
				});

		};

	};

})();
