(function() {
    'use strict';

    angular.module('settler.settle')
        .controller('ResultController', ResultController);

    ResultController.$inject = [
        '$scope',
        '$stateParams',
        'persistenceService'
    ];
    function ResultController($scope, $stateParams, persistenceService) {
        var vm = this,
            settlementId,
            data;

        /// Data
        vm.result = [];
        vm.title = "";

        /// Actions
        vm.updateSettlement = updateSettlement;

        /// Events
        $scope.$on('$ionicView.enter', initialize);

        /// Implemenation
        function initialize() {
            settlementId = $stateParams.settlementId;
            data = persistenceService.read(settlementId);
            vm.title = data.title;
            vm.result = data.result;
        }

        function updateSettlement() {
            persistenceService.update(settlementId, data);
        }

    }
})();
