(function() {
    'use strict';

    angular.module('settler.history')
        .factory('settingsService', settingsServiceFactory);

    settingsServiceFactory.inject = ['persistenceService', 'defaultSettings'];
    function settingsServiceFactory(persistenceService, defaultSettings) {
        var entityName = 'settings',
            historyKey = 'history';

        return {
            resetSettings: resetSettings,
            setDefaultSettings: setDefaultSettings,
            loadHistorySettings: loadHistorySettings,
            saveHistorySettings: saveHistorySettings
        };

        function resetSettings() {
            persistenceService.updateOrCreate(entityName, historyKey, defaultSettings.history);
        }

        function setDefaultSettings() {
            persistenceService.create(entityName, historyKey, defaultSettings.history);
        }

        function loadHistorySettings() {
            return persistenceService.read(entityName, historyKey);
        }

        function saveHistorySettings(history) {
            persistenceService.updateOrCreate(entityName, historyKey, history);
        }
    }
})();
