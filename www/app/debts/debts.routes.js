(function() {
    'use strict';

    angular.module('settler.debts')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('settler.debts', {
                url: '/debts',
                views: {
                    'menuContent': {
                        templateUrl: 'app/debts/debts.html',
                        controller: 'DebtsController as vm'
                    }
                }
            });
    }
})();
