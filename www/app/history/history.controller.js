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

        /// Events
        $scope.$on('$ionicView.enter', initialize);

        /// Implementation
        function initialize() {
            vm.history = persistenceService.readAll();
        }

        function removeItem(index) {
            var affected = vm.history.splice(index, 1).shift();
            persistenceService.destroy(affected[persistenceService.KEY_NAME]);
        }
    }
})();
