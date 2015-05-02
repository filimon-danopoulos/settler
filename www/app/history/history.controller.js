(function() {
    'use strict';

    angular.module('settler.history')
        .controller('HistoryController', HistoryController);

    HistoryController.$inject = [
        '$scope',
        'persistenceService',
        'historyService',
        'settingsService'
    ];
    function HistoryController($scope, persistenceService, historyService, settingsService) {
        var vm = this;

        /// Data
        vm.history = [];

        /// Actions
        vm.removeItem = removeItem;
        vm.getSettlementId = getSettlementId;
        vm.hasVisibleEntries = hasVisibleEntries;
        vm.isEntryVisible = isEntryVisible;

        /// Events
        $scope.$on('$ionicView.beforeEnter', loadSettings);
        $scope.$on('$ionicView.enter', initialize);

        /// Implementation
        function loadSettings() {
            var settings = settingsService.loadHistorySettings();
            vm.showCompletedEntries = settings.showCompletedEntries;
        }

        function initialize() {
            vm.history = historyService.loadHistory();
        }

        function removeItem(index) {
            var affected = vm.history.splice(index, 1).shift();
            historyService.removeEntry(affected);
        }

        function getSettlementId(item) {
            return item[persistenceService.KEY_NAME];
        }

        function hasVisibleEntries() {
            return vm.history
                .filter(function(x) {
                    return isEntryVisible(x);
                })
                .length;
        }

        function isEntryVisible(entry) {
            if (vm.showCompletedEntries) {
                return true;
            } else {
                return !entry.isCompleted;
            }
        }
    }
})();
