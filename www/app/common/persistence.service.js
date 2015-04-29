(function() {
    'use strict';

    angular.module('settler.common')
        .factory('persistenceService', persistenceServiceFactory);

    persistenceServiceFactory.inject = ["$window"];
    function persistenceServiceFactory($window) {
        var storageKeyPropertyName = "storageKey";

        return {
            read: read,
            readAll: readAll,
            create: create,
            update: update,
            destroy: destroy,
            updateOrCreate: updateOrCreate,
            KEY_NAME: storageKeyPropertyName
        };

        function read(key) {
            var data = $window.localStorage.getItem(key);
            if (data === null) {
                throw new Error("Could not find: " + key);
            }
            return JSON.parse(data);
        }

        function readAll() {
            var key,
                entry,
                result = [];

            for ( var i = 0, len = $window.localStorage.length; i < len; ++i ) {
                key = $window.localStorage.key(i);
                entry = $window.localStorage.getItem(key);
                result.push(JSON.parse(entry));
            }

            return result;
        }

        function create(key, data) {
            if ($window.localStorage.getItem(key) !== null) {
                throw new Error("Could not create "+key+" the key already exists.");
            }
            insertData(key, data);
        }

        function update(key, data) {
            if ($window.localStorage.getItem(key) === null) {
                throw new Error("Could not update "+key+" the key doesn't exists.");
            }
            insertData(key, data);
        }

        function destroy(key) {
            $window.localStorage.removeItem(key);
        }

        function updateOrCreate(key, data) {
            insertData(key, data);
        }

        function prepareData(key, data) {
            if (storageKeyPropertyName in data) {
                throw new Error(storageKeyPropertyName + " is reversed for localStorage.");
            }
            data[storageKeyPropertyName] = key;
            return JSON.stringify(data);
        }

        function insertData(key, data) {
            $window.localStorage.setItem(key, prepareData(key, data));
        }
    }
})();
