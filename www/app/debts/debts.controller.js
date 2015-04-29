(function() {
    'use strict';

    angular.module('settler.debts')
        .controller('DebtsController', DebtsController);

    DebtsController.inject = ['$scope', 'persistenceService'];
    function DebtsController($scope, persistenceService) {
        var vm = this;

        /// Data
        vm.debts = [];

        /// Events
        $scope.$on('$ionicView.enter', initialize);

        /// Implementation
        function initialize() {
            vm.debts = persistenceService
                .readAll()
                .reduce(function(debts, current) {
                    var result = current.result
                        .filter(function(x) {
                            return !x.settled;
                        });
                    return debts.concat(result);
                }, []);
        }
    }
})();
