(function() {
    'use strict';

    angular.module('settler.history')
        .controller('HistoryController', HistoryController);

    HistoryController.$inject = ['$scope', 'localStorage'];
    function HistoryController($scope, localStorage) {
        var vm = this;

        /// Data
        vm.history = [];

        /// Actions
        vm.removeItem = removeItem;

        /// Events
        $scope.$on('$ionicView.enter', initialize);

        /// Implementation
        function initialize() {
            vm.history = localStorage.readAll();
        }

        function removeItem(index) {
            var affected = vm.history.splice(index, 1).shift();
            localStorage.destroy(affected[localStorage.KEY_NAME]);
        }
    }
})();
