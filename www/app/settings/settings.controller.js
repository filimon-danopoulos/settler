(function() {
    'use strict';

    angular.module('settler.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.inject = ['$scope', '$ionicPopup', 'persistenceService'];
    function SettingsController($scope, $ionicPopup, persistenceService) {
        var vm = this,
            clearHistoryModal;

        /// Actions
        vm.showClearHistoryModal = showClearHistoryModal;

        /// Implementation
        function showClearHistoryModal() {
            $ionicPopup.confirm({
                title: 'Clear History',
                template: 'This will remove ALL history and all debts. ' +
                    'Are you sure you want to continue?'
            }).then(function(result) {
                if(result) {
                    clearHistory();
                }
            });
        }

        function clearHistory() {
            persistenceService.clearEntity("settlements");
        }
    }
})();
