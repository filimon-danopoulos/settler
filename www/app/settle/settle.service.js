(function() {
    'use strict';

    angular.module('settler.settle')
        .factory('settleService', settleCalculationFactory);

    settleCalculationFactory.inject = [];
    function settleCalculationFactory() {
        return {
            getTransactions: getTransactions
        };
    }

    function getTransactions(expenses) {
        var transactions = [],
            result,
            balances = getBalances(expenses);
        while(balances.length) {
            result = resolveLargestDebt(balances);
            balances = result.balances;
            transactions.push(result.transaction);
        }
        return transactions.filter(function(x) {
            return x.gives !== x.recieves;
        });
    }

    function getBalances(expenses) {
        var mean = getMeanCost(expenses);
        return expenses.map(function(x) {
            return {
                name: x.name,
                amount: x.amount - mean
            };
        });
    }

    function getMeanCost(expenses) {
        var total = expenses.reduce(function(sum, current) {
            return sum + current.amount;
        }, 0);
        return total/expenses.length;
    }

    function resolveLargestDebt(balances) {
        var min = getLowestBalance(balances);
        var max = getHighestBalance(balances);
        if (Math.abs(min.amount) > max.amount) {
            return resolveMinBalanceLargerThanMaxBalance(balances, min, max);
        } else {
            return resolveMaxBalanceLargerThanMinBalance(balances, min, max);
        }
    }

    function getLowestBalance(balances) {
        var minIndex = 0,
            min = balances.reduce(function(min, current, index) {
            if (min.amount >= current.amount) {
                minIndex = index;
                return current;
            }
            return min;
        });
        min.minIndex = minIndex;
        return min;
    }

    function getHighestBalance(balances) {
        var maxIndex = 0,
            max = balances.reduce(function(max, current, index) {
            if (max.amount <= current.amount) {
                maxIndex = index;
                return current;
            }
            return max;
        });
        max.maxIndex = maxIndex;
        return max;
    }

    function resolveMinBalanceLargerThanMaxBalance(balances, min, max) {
        var transaction = new Transaction(min.name, max.name, max.amount);
        balances[min.minIndex].amount = calculateRemainingAmount(min, max);
        balances[max.maxIndex].amount = 0;
        return new ResolveResult(transaction, balances);
    }

    function resolveMaxBalanceLargerThanMinBalance(balances, min, max) {
        var transaction = new Transaction(min.name, max.name, Math.abs(min.amount));
        balances[max.maxIndex].amount = calculateRemainingAmount(min, max);
        balances[min.minIndex].amount = 0;
        return new ResolveResult(transaction, balances);
    }

    function calculateRemainingAmount(min, max) {
        return Math.round(max.amount - Math.abs(min.amount));
    }


    function Transaction(gives, recieves, amount) {
        this.gives = gives;
        this.recieves = recieves;
        this.amount = Math.round(amount);
    }

    function ResolveResult(transaction, balances) {
        this.transaction = transaction;
        this.balances = balances.filter(function(x) { return x.amount; });
    }

})();
