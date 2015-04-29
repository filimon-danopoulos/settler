(function() {
    'use strict';

    angular.module('settler.settle')
        .controller('SettleController', SettleController);

    SettleController.inject = [
        '$scope',
        '$ionicModal',
        '$ionicPopup',
        '$ionicPopover',
        'persistenceService'
    ];
    function SettleController($scope, $ionicModal, $ionicPopup, $ionicPopover, persistenceService) {
        var vm = this,
            editing = false,
            editingIndex = -1,
            addEntryModal,
            actionsPopover;

        /// Data
        vm.settlementId = null;
        vm.isArchived = false;
        vm.settlementTitle = '';
        vm.entries = [];
        vm.newEntry = { name: "", note: "", amount: "" };

        /// Actions
        vm.reset = reset;
        vm.removeEntry = removeEntry;
        vm.editEntry = editEntry;
        vm.openAddEntryModal = openAddEntryModal;
        vm.closeAddEntryModal = closeAddEntryModal;
        vm.saveNewEntry = saveNewEntry;
        vm.renameSettlement = renameSettlement;
        vm.showActionsPopover = showActionsPopover;
        vm.archiveSettlement = archiveSettlement;

        /// Events
        $scope.$on('$destroy', function() {
            addEntryModal.remove();
            actionsPopover.remove();
        });

        /// Initialization
        initialize();

        /// Implementation
        function initialize() {
            var now = new Date();

            vm.settlementId = +now;
            vm.settlementTitle = now.toISOString().split('T').shift();

            $ionicModal.fromTemplateUrl('app/settle/templates/add-entry-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                addEntryModal = modal;
            });

            $ionicPopover.fromTemplateUrl('app/settle/templates/actions-popover.html', {
                scope: $scope,
            }).then(function(popover) {
                actionsPopover = popover;
            });
        }

        function reset() {
            var createNew = function() {
                var now = new Date();
                vm.settlementId = +now;
                vm.settlementTitle = now.toISOString().split('T').shift();
                vm.isArchived = false;
                vm.entries = [];
                vm.newEntry = { name: "", note: "", amount: "" };
            };

            actionsPopover.hide();
            if (vm.isArchived) {
                createNew();
            } else {
                $ionicPopup.confirm({
                    title: 'New',
                    template: 'Creating a new settlement will discard this one. '+
                        'You will still be able to access it via the history function. ' +
                        'Do you want to crete a new settlement?'
                }).then(function(result) {
                    if(result) {
                        createNew();
                    }
                });
            }
        }

        function removeEntry(index) {
            vm.entries.splice(index, 1);
            updateSettlementInStorage();
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
            addEntryModal.show();
        }

        function closeAddEntryModal() {
            vm.newEntry.name = "";
            vm.newEntry.note = "";
            vm.newEntry.amount = "";

            editing = false;
            editingIndex = -1;

            addEntryModal.hide();
        }

        function saveNewEntry() {
            var newEntry = {
                name: vm.newEntry.name,
                note: vm.newEntry.note,
                amount: parseFloat(vm.newEntry.amount)
            };

            if (editing) {
                vm.entries[editingIndex] = newEntry;
            } else {
                vm.entries.push(newEntry);
            }
            updateSettlementInStorage();

            closeAddEntryModal();
        }

        function renameSettlement() {
            actionsPopover.hide();
            $ionicPopup.prompt({
                title: 'Rename settlement',
                inputType: 'text',
                inputPlaceholder: 'New name'
            }).then(function(input) {
                if (input) {
                    vm.settlementTitle = input;
                    updateSettlementInStorage();
                }
            });
        }

        function updateSettlementInStorage() {
            persistenceService.updateOrCreate(vm.settlementId, {
                title: vm.settlementTitle,
                archived: vm.isArchived,
                entries: vm.entries
            });
        }

        function showActionsPopover($event) {
            actionsPopover.show($event);
        }


        function archiveSettlement() {
            actionsPopover.hide();
            $ionicPopup.confirm({
                title: 'Archive',
                template: 'An archived settlement can not be edited. ' +
                    'Are you sure you want to archive this settlement?'
            }).then(function(result) {
                if(result) {
                    vm.isArchived = true;
                    updateSettlementInStorage();
                }
            });
        }
    }
})();
