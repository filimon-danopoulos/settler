(function() {
    'use strict';

    angular.module('settler.settings', [])
        .run(run);

    run.$inject = ['settingsService'];
    function run(settingsService) {
        try {
            settingsService.setDefaultSettings();
        } catch (ex) {
            // Ignore this exception.
            // We only want to create default setings if no other settings exist.
        }
    }
})();
