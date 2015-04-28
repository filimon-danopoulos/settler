(function() {
    'use strict';

    angular.module('settler.history')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('settler.history', {
                url: '/history',
                views: {
                    'menuContent': {
                        templateUrl: 'app/history/history.html',
                        controller: 'HistoryController as vm'
                    }
                }
            })
    }
})();
