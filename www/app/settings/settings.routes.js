(function() {
    'use strict';

    angular.module('settler.settings')
        .config(config)
        .run(run);

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

    run.$inject = ['persistenceService'];
    function run(persistenceService) {
        try {
            persistenceService.create('settings', 'history', {
                showCompletedEntries: true
            });
        } catch (ex) {
            // Ignore this exception.
        }

    }

})();
