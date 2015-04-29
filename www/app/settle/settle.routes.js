(function() {
    'use strict';

    angular.module('settler.settle')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('settler.settle', {
                url: '/settle/{settlementId}',
                views: {
                    'menuContent': {
                        templateUrl: 'app/settle/templates/settle.html',
                        controller: 'SettleController as vm'
                    }
                }
            })
            .state('settler.result', {
                url: '/result/:settlementId',
                views: {
                    'menuContent': {
                        templateUrl: 'app/settle/templates/result.html',
                        controller: 'ResultController as vm'
                    }
                }
            });
    }
})();
