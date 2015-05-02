(function() {
    'use strict';

    angular.module('settler.history')
        .factory('historyService', historyServiceFactory);

    historyServiceFactory.inject = ['persistenceService'];
    function historyServiceFactory(persistenceService) {
        var entityName = 'settlements';

        return {
            clearHistory: clearHistory,
            removeEntry: removeEntry,
            loadHistory: loadHistory
        };

        function clearHistory() {
            persistenceService.clearEntity(entityName);
        }

        function removeEntry(entry) {
            persistenceService.destroy(entityName, entry[persistenceService.KEY_NAME]);
        }

        function loadHistory() {
            return persistenceService
                .readAll(entityName)
                .map(function(x) {
                    x.isCompleted = isCompleted(x.result);
                    return x;
                });
        }

        function isCompleted(result) {
            var hasResult = !!result.length;
            if (!hasResult) {
                return false;
            } else {
                return result.every(function(r) {
                    return r.settled;
                });
            }
        }
    }
})();
