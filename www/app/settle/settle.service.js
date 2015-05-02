(function() {
    'use strict';

    angular.module('settler.settle')
        .factory('settleService', settleServiceFactory);

    settleServiceFactory.inject = ['persistenceService', 'settlementTransactionService'];
    function settleServiceFactory(persistenceService, settlementTransactionService) {
        var entityName = 'settlements';

        return {
            calculateResult: calculateResult,
            loadSettlement: loadSettlement,
            saveSettlement: saveSettlement
        };

        function calculateResult(entries) {
            var id = 0;
            return settlementTransactionService
                .getTransactions(entries)
                .map(function(x) {
                    x.transactionId = id++;
                    x.settled = false;
                    return x;
                });
        }


        function saveSettlement(settlementId, settlement) {
            persistenceService.updateOrCreate(entityName, settlementId, {
                title: settlement.settlementTitle,
                archived: settlement.isArchived,
                entries: settlement.entries,
                result: settlement.result
            });
        }

        function loadSettlement(settlementId) {
            return persistenceService.read(entityName, settlementId);
        }

    }
})();
