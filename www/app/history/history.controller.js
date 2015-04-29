(function() {
    'use strict';

    angular.module('settler.history')
        .controller('HistoryController', HistoryController);

    HistoryController.$inject = ['$scope', 'persistenceService'];
    function HistoryController($scope, persistenceService) {
        var vm = this;

        /// Data
        vm.history = [];

        /// Actions
        vm.removeItem = removeItem;
        vm.getSettlementId = getSettlementId;

        /// Events
        $scope.$on('$ionicView.enter', initialize);

        /// Implementation
        function initialize() {
            vm.history = persistenceService
                .readAll()
                .map(function(x) {
                    x.isCompleted = x.result.every(function(y) {
                        return y.settled;
                    });
                    return x;
                });
        }

        function removeItem(index) {
            var affected = vm.history.splice(index, 1).shift();
            persistenceService.destroy(affected[persistenceService.KEY_NAME]);
        }

        function getSettlementId(item) {
            return item[persistenceService.KEY_NAME];
        }
    }
})();
