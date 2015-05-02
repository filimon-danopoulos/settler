(function() {
    'use strict';

    angular.module('settler.history')
        .factory('historyService', historyServiceFactory);

    historyServiceFactory.inject = ['persistenceService'];
    function historyServiceFactory(persistenceService) {
        return {
            clearHistory: clearHistory
        };

        function clearHistory() {
            persistenceService.clearEntity('settlements');
        }
    }
})();
