(function() {
    'use strict';

    angular.module('settler.settings')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('settler.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'app/settings/settings.html',
                        controller: 'SettingsController as vm'
                    }
                }
            });
    }
})();
