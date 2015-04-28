(function() {
    'use strict';

    angular.module('settler.settle')
        .controller('ResultController', ResultController);

    ResultController.$inject = [
        '$scope',
        '$stateParams',
        'settlementTransactionService',
        'localStorage'
    ];
    function ResultController($scope, $stateParams, settlementTransactionService, localStorage) {
        var vm = this,
            settlementId;

        /// Data
        vm.result = [];
        vm.title = "";

        /// Events
        $scope.$on('$ionicView.enter', initialize);

        /// Implemenation
        function initialize() {
            var data;
            settlementId = $stateParams.settlementId;
            data = localStorage.read(settlementId);
            vm.title = data.title;
            vm.result = calculateResult(data.entries);
        }

        function calculateResult(entries) {
            return settlementTransactionService.getTransactions(entries);
        }
    }
})();
