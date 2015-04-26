(function() {
    'use strict';

    angular.module('settler.settle')
        .controller('SettleController', SettleController);

    SettleController.inject = ['$scope', '$ionicModal'];
    function SettleController($scope, $ionicModal) {
        var vm = this,
            modal;

        /// Data
        vm.settlementTitle = 'Untitled settlement';
        vm.items = [];

        /// Actions
        vm.removeEntry = removeEntry;
        vm.openAddEntryModal = openAddEntryModal;
        vm.closeAddEntryModal = closeAddEntryModal;

        /// Events
        $scope.$on('$destroy', function() {
            vm.modal.remove();
        });

        /// Initialization
        initialize();

        /// Implementation
        function initialize() {
            for(var i = 0; i < 20; i++) {
                vm.items.push({title: "Test "+i, description: "Test test test test test test test "+i});
            }
            $ionicModal.fromTemplateUrl('app/settle/add-entry-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(result) {
                modal = result;
            });
        }

        function removeEntry(index) {
            vm.items.splice(index, 1);
        }

        function openAddEntryModal() {
            modal.show();
        }

        function closeAddEntryModal() {
            modal.hide();
        }
    }
})();
