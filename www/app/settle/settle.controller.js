(function() {
    'use strict';

    angular.module('settler.settle')
        .controller('SettleController', SettleController);

    SettleController.inject = [
        '$scope',
        '$state',
        '$ionicModal',
        '$ionicPopup',
        '$ionicPopover',
        '$stateParams',
        'settleService'
    ];
    function SettleController($scope, $state, $ionicModal, $ionicPopup, $ionicPopover,
            $stateParams, settleService) {
        var vm = this,
            editing = false,
            editingIndex = -1,
            addEntryModal,
            actionsPopover;

        /// Data
        vm.isFromHistory = $stateParams.settlementId;

        /// Actions
        vm.reset = reset;
        vm.removeEntry = removeEntry;
        vm.editEntry = editEntry;
        vm.openAddEntryModal = openAddEntryModal;
        vm.closeAddEntryModal = closeAddEntryModal;
        vm.saveEntry = saveEntry;
        vm.renameSettlement = renameSettlement;
        vm.showActionsPopover = showActionsPopover;
        vm.archiveSettlement = archiveSettlement;
        vm.showResults = showResults;

        /// Events
        $scope.$on('$ionicView.beforeEnter', initializeSettlement);
        $scope.$on('$ionicView.enter', initializeViews);
        $scope.$on('$destroy', function() {
            addEntryModal.remove();
            actionsPopover.remove();
        });

        /// Implementation
        function initializeSettlement() {
            if (!vm.isFromHistory && !vm.settlementId) {
                createNew();
            } else if (vm.isFromHistory) {
                loadFromHistory($stateParams.settlementId);
            }
        }

        function initializeViews() {
            initializeModal ();
            initializePopover();
        }

        function createNew() {
            vm.settlementId = getNewSettlementId();
            vm.settlementTitle = getDefaultSettleMentTitle();
            vm.isArchived = false;
            vm.entries = [];
            vm.newEntry = { name: "", note: "", amount: "" };
            vm.result = [];
        }

        function loadFromHistory(settlementId) {
            var data = settleService.loadSettlement(settlementId);
            vm.settlementId = settlementId;
            vm.settlementTitle = data.title;
            vm.isArchived = data.archived;
            vm.entries = data.entries;
            vm.newEntry = { name: "", note: "", amount: "" };
            vm.result = data.result;
        }

        function initializeModal() {
            $ionicModal.fromTemplateUrl('app/settle/templates/add-entry-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                addEntryModal = modal;
            });
        }

        function initializePopover() {
            $ionicPopover.fromTemplateUrl('app/settle/templates/actions-popover.html', {
                scope: $scope,
            }).then(function(popover) {
                actionsPopover = popover;
            });
        }

        function getNewSettlementId() {
            var now = new Date();
            return +now;
        }

        function getDefaultSettleMentTitle() {
            var now = new Date();
            return now.toISOString().split('T').shift();
        }

        function reset() {
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
            invalidateResult();
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

        function saveEntry() {
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
            invalidateResult();
            updateSettlementInStorage();
            closeAddEntryModal();
        }

        function invalidateResult() {
            vm.result = [];
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
            settleService.saveSettlement(vm.settlementId, {
                settlementTitle: vm.settlementTitle,
                isArchived: vm.isArchived,
                entries: vm.entries,
                result: vm.result
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

        function showResults() {
            if (!vm.result.length) {
                calculateResult();
                updateSettlementInStorage();
            }
            $state.go("settler.result", {settlementId: vm.settlementId});
        }

        function calculateResult() {
            vm.result = settleService.calculateResult(vm.entries)
        }
    }
})();
