(function() {
    'use strict';

    angular.module('settler.start')
        .controller('StartController', StartController);

    StartController.inject = ['$scope', 'historyService'];
    function StartController($scope, historyService) {
        var vm = this,
            transactions = [],
            entries = [],
            participations = {};

        /// Events
        $scope.$on('$ionicView.enter', initialize);

        /// Implementation
        function initialize() {
            var data = historyService.loadHistory();

            transactions = getTransactions(data);
            entries = getEntries(data);

            vm.settlements = data;
            vm.debts = transactions;
            vm.entries = entries;
            vm.largestDebts = getLargestDepts(transactions);
            vm.largestExpenses = getLargestExpenses(entries);
        }

        function getTransactions(data) {
            return data.reduce(function(total, current) {
                    return total.concat(current.result);
                }, []);
        }

        function getEntries(data) {
            return data.reduce(function(total, current) {
                    return total.concat(current.entries);
                }, []);
        }

        function getLargestDepts(transactions) {
            return transactions
                .sort(function(x,y) {
                    return y.amount-x.amount;
                })
                .slice(0,3);
        }

        function getLargestExpenses(entries) {
            return entries
                .sort(function(x, y) {
                    return y.amount - x.amount;
                })
                .slice(0,3);
        }
    }
})();
