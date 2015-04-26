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
                        templateUrl: 'app/settle/settle.html',
                        controller: 'SettleController as vm'
                    }
                }
            });
    }
})();
