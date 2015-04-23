(function() {
    'use strict';

    angular.module('settler.menu')
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('settler', {
                url: '/settler',
                abstract: true,
                templateUrl: 'app/menu/menu.html',
                controller: 'MenuController as menu'
            });
    }
})();
