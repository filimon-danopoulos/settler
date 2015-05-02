(function() {
    'use strict';

    angular.module('settler.settings')
        .value('defaultSettings', {
            history: {
                showCompletedEntries: true
            }
        });
})();
