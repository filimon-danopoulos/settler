(function() {
	'use strict';
	var dependencies = [
		/* Framework specific includes */
		'ionic',
		/* Application modules */
		'settler.common',
		'settler.menu',
		'settler.start',
		'settler.settle',
		'settler.history',
		'settler.debts'
	];

	angular.module('settler', dependencies)
		.run(run)
		.config(config);

	run.$inject = ['$ionicPlatform'];
	function run($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory
			// bar above the keyboard for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	}

	config.$inject = ['$urlRouterProvider', '$ionicConfigProvider'];
	function config($urlRouterProvider, $ionicConfigProvider) {
		// Defaut route
		$urlRouterProvider.otherwise('/settler/settle');
		// Always places tabs on bottom
		$ionicConfigProvider.tabs.position('bottom');
		// Allign title center for all platfroms
		$ionicConfigProvider.navBar.alignTitle('center');
	}
})();
