(function() {
    'use strict';

    angular.module('settler.settle')
        .controller('SettleController', SettleController);

    SettleController.inject = ['$scope', '$ionicModal', '$ionicPopup'];
    function SettleController($scope, $ionicModal, $ionicPopup) {
        var vm = this,
            editing = false,
            editingIndex = -1,
            modal;

        /// Data
        vm.canSwipeEntries = true;
        vm.settlementTitle = 'Untitled settlement';
        vm.entries = [];
        vm.newEntry = { name: "", note: "", amount: "" };

        /// Actions
        vm.removeEntry = removeEntry;
        vm.editEntry = editEntry;
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

        function editEntry(index) {
            var entry = vm.entries[index];
            vm.newEntry.name = entry.name;
            vm.newEntry.note = entry.note;
            vm.newEntry.amount = entry.amount;

            editing = true;
            editingIndex = index;

            openAddEntryModal();
        }

        function openAddEntryModal() {
            modal.show();
        }

        function closeAddEntryModal() {
            vm.newEntry.name = "";
            vm.newEntry.note = "";
            vm.newEntry.amount = "";

            editing = false;
            editingIndex = -1;

            modal.hide();
        }

        function saveNewEntry() {
            var newEntry = {
                name: vm.newEntry.name,
                note: vm.newEntry.note,
                amount: vm.newEntry.amount
            };

            if (editing) {
                vm.entries[editingIndex] = newEntry;
            } else {
                vm.entries.push(newEntry);
            }

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
