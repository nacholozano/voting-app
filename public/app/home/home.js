;
(function () {

	'use strict';

	angular.module('votingApp')

	.controller('HomeCtrl', ['polls', '$compile', 'auth' /*'pollsPromise'*/ , HomeCtrl]);

	function HomeCtrl(polls, $compile, auth /*pollsPromise*/ ) {

		var vm = this;

		// Auth control
		vm.isLoggedIn = auth.isLoggedIn;

		// Tabs
		vm.tab = 'newPoll';
		vm.isSet = function (tab) {
			return vm.tab === tab;
		};
		vm.setTab = function (tab) {
			vm.tab = tab;
		};

		// Add option
		var addOptionCounter = 2, // number of inputs (default: 2)
			newPollForm = angular.element('.options'); //get new poll form

		vm.addOption = function () {
			// new input
			var newOption = "<div class='form-group'> <input required maxlength='70' class='form-control' type='text' id='inputSmall' placeholder='Option' ng-model='newPoll.options[" + addOptionCounter + "].name'> </div>";

			newPollForm.append($compile(newOption)(vm));

			addOptionCounter++;
		};


		//	My polls

		vm.myPolls = polls.polls;
		//vm.noPolls = vm.myPolls.length === 0 ? true : false;
		vm.deletePoll = function (pollId) {
			polls.deletePoll(pollId);
			vm.noPolls = myPolls.polls.length === 0 ? true : false;
		};

		//	Filters
		vm.order = 'date';
		vm.search = '';
		/*vm.limit = 5;
vm.loadMore = function () {
	vm.limit += vm.limit;
};*/

		//	New poll
		vm.newPoll = {
			options: []
		};

		vm.createPoll = function () {

			vm.newPoll.date = new Date();

			polls.createPoll(vm.newPoll)
				.error(function (error) {
					vm.error = error;
				})
				.success(function (poll) {
					vm.poll = poll;
					vm.noPolls = vm.myPolls.length === 0 ? true : false;
				});

			// Reset form
			vm.newPoll = {
				options: []
			};

		};

	};

})();
