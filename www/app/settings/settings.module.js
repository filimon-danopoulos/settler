(function() {
    'use strict';

    angular.module('settler.settings', [])
        .run(run);


    run.$inject = ['persistenceService', 'defaultSettings'];
    function run(persistenceService, defaultSettings) {
        try {
            persistenceService.create('settings', 'history', defaultSettings.history);
        } catch (ex) {
            // Ignore this exception.
            // We only want to create default setings if no other settings exist.
        }

    }
})();
