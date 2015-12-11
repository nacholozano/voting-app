;
(function () {
	angular.module('votingApp').
	controller('SettingsCtrl', ['auth', SettingsCtrl]);

	function SettingsCtrl(auth) {

		var vm = this;

		vm.data = {};

		vm.update = function () {

			auth.update(vm.data)
				.error(function (error) {
					vm.success = '';
					vm.error = error;
					if (vm.error.message === 'Incorrect current password') {
						vm.data.currentPassword = '';
					}
				})
				.success(function (data) {
					vm.error = '';
					vm.success = data;
					vm.data = {};
				});

		};

	};

})();
