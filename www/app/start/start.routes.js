(function() {
    'use strict';

    angular.module('settler.start')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('settler.start', {
                url: '/start',
                views: {
                    'menuContent': {
                        templateUrl: 'app/start/start.html'
                    }
                }
            });
    }
})();
