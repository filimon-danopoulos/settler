(function() {
	'use strict';
	var dependencies = [
		/* Framework specific includes */
		'ionic',
		'ngCordova',
		/* Application modules */
		'settler.common',
		'settler.menu',
		'settler.start',
		'settler.settle',
		'settler.history',
		'settler.debts',
		'settler.settings'
	];

	angular.module('settler', dependencies)
		.run(run)
		.config(config);

	run.$inject = ['$ionicPlatform', '$cordovaSplashscreen'];
	function run($ionicPlatform, $cordovaSplashscreen) {
		$ionicPlatform.ready(function() {
			$cordovaSplashScreen.hide();
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	}

	config.$inject = ['$urlRouterProvider', '$ionicConfigProvider'];
	function config($urlRouterProvider, $ionicConfigProvider) {
		// Defaut route
		$urlRouterProvider.otherwise('/settler/start');

		// Allign title center for all platfroms
		//$ionicConfigProvider.navBar.alignTitle('center');
	}
})();
