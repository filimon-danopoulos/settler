(function() {
    'use strict';

    angular.module('settler.debts')
        .controller('DebtsController', DebtsController);

    DebtsController.inject = ['$scope', 'persistenceService'];
    function DebtsController($scope, persistenceService) {
        var vm = this,
            data;

        /// Data
        vm.debts = [];

        /// Actions
        vm.refresh = refresh;
        vm.toggleDebt = toggleDebt;

        /// Events
        $scope.$on('$ionicView.beforeEnter', initialize);

        /// Implementation
        function initialize() {
            loadData();
        }

        function refresh() {
            loadData();
            $scope.$broadcast('scroll.refreshComplete');
        }

        function loadData() {
            data = persistenceService.readAll("settlements");
            vm.debts = data
                .filter(function(x) {
                    return x.archived;
                })
                .reduce(function(debts, current) {
                    var result = current.result
                        .filter(function(x) {
                            return !x.settled;
                        })
                        .map(function(x) {
                            x.settlementId = current[persistenceService.KEY_NAME];
                            return x;
                        });
                    return debts.concat(result);
                }, []);
        }

        function toggleDebt(debt) {
            var settlement = data.filter(function(x) {
                return x[persistenceService.KEY_NAME] === debt.settlementId;
            }).shift();

            debt.settled = !debt.settled;

            settlement.result = settlement.result
                .map(function(x) {
                    if (x.transactionId === debt.transactionId) {
                        x.settled = debt.settled;
                    }
                    return x;
                });

            persistenceService.update(
                "settlements",
                settlement[persistenceService.KEY_NAME],
                settlement
            );
        }
    }
})();
