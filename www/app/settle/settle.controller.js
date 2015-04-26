(function() {
    'use strict';

    angular.module('settler.settle')
        .controller('SettleController', SettleController);

    SettleController.inject = ['$scope', '$ionicModal', '$ionicPopup'];
    function SettleController($scope, $ionicModal, $ionicPopup) {
        var vm = this,
            modal;

        /// Data
        vm.canSwipeEntries = true;
        vm.settlementTitle = 'Untitled settlement';
        vm.entries = [];
        vm.newEntry = { name: "", note: "", amount: "" };

        /// Actions
        vm.removeEntry = removeEntry;
        vm.openAddEntryModal = openAddEntryModal;
        vm.closeAddEntryModal = closeAddEntryModal;
        vm.saveNewEntry = saveNewEntry;
        vm.renameSettlement = renameSettlement;

        /// Events
        $scope.$on('$destroy', function() {
            vm.modal.remove();
        });

        /// Initialization
        initialize();

        /// Implementation
        function initialize() {
            $ionicModal.fromTemplateUrl('app/settle/add-entry-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(result) {
                modal = result;
            });
        }

        function removeEntry(index) {
            vm.entries.splice(index, 1);
        }

        function openAddEntryModal() {
            modal.show();
        }

        function closeAddEntryModal() {
            vm.newEntry.name = "";
            vm.newEntry.note = "";
            vm.newEntry.amount = "";
            modal.hide();
        }

        function saveNewEntry() {
            vm.entries.push({
                name: vm.newEntry.name,
                note: vm.newEntry.note,
                amount: vm.newEntry.amount
            });
            closeAddEntryModal();
        }

        function renameSettlement() {
            $ionicPopup.prompt({
                title: 'Rename settlement',
                inputType: 'text',
                inputPlaceholder: 'New name'
            }).then(function(input) {
                if (input) {
                    vm.settlementTitle = input;
                }
            });
        }
    }
})();
