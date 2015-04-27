(function() {
    'use strict';

    angular.module('settler.settle')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('settler.settle', {
                url: '/settle',
                views: {
                    'menuContent': {
                        templateUrl: 'app/settle/templates/settle.html',
                        controller: 'SettleController as vm'
                    }
                }
            })
            .state('settler.settle.entries', {
                url: '/entries',
                views: {
                    'entriesTab': {
                        templateUrl: 'app/settle/templates/entries.html'
                    }
                }
            })
            .state('settler.settle.result', {
                url: '/result',
                views: {
                    'resultTab': {
                        templateUrl: 'app/settle/templates/result.html'
                    }
                }
            });
    }
})();
