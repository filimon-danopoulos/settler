(function() {
    'use strict';

    angular.module('settler.settings', [])
        .run(run);


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
