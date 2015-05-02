(function() {
    'use strict';

    angular.module('settler.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.inject = [
        '$scope',
        '$ionicPopup',
        'settingsService',
        'historyService'
    ];
    function SettingsController($scope, $ionicPopup, settingsService, historyService) {
        var vm = this,
            clearHistoryModal;

        /// Data
        vm.history = {};

        /// Actions
        vm.showClearHistoryModal = showClearHistoryModal;
        vm.showResetSettingsModal = showResetSettingsModal;
        vm.updateHistorySettings = updateHistorySettings;

        /// Events
        $scope.$on('$ionicView.beforeEnter', initialize);

        /// Implementation
        function initialize() {
            loadHistory();
        }

        function loadHistory() {
            vm.history = settingsService.loadHistorySettings();
        }

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

        function showResetSettingsModal() {
            $ionicPopup.confirm({
                title: 'Reset Settings',
                template: 'Are you sure you want to reset all the settings?'
            }).then(function(result) {
                if(result) {
                    settingsService.resetSettings();
                    loadHistory();
                }
            });
        }

        function clearHistory() {
            historyService.clearHistory();
        }

        function updateHistorySettings() {
            settingsService.saveHistorySettings(vm.history);
        }
    }
})();
