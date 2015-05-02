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
            updateOrCreate: updateOrCreate,
            destroy: destroy,
            clearEntity: clearEntity,
            KEY_NAME: storageKeyPropertyName
        };


        function read(entity, key) {
            var entries = getEntity(entity),
                entry = entries[key];
            if (entry === undefined) {
                throw new Error("Could not find entry with id: " + key);
            }
            return entry;
        }

        function readAll(entity) {
            var entries = getEntity(entity),
                entry,
                result = [];
            for(var key in entries) {
                if (entries.hasOwnProperty(key)) {
                    entry = entries[key];
                    result.push(entry);
                }
            }
            return result;
        }

        function create(entity, key, data) {
            var entries = getEntity(entity);
            if (key in entries) {
                throw new Error("The key "+key+" already exists!");
            }
            setEntity(entity, entries, key, data);
        }

        function update(entity, key, data) {
            var entries;
            if ($window.localStorage.getItem(entity) === null) {
                throw new Error("Could not update the entity "+entity+" since it doesn't exists.");
            }
            entries = getEntity(entity);
            if (!(key in entries)) {
                throw new Error("The key "+key+" doesn't exists!");
            }
            setEntity(entity, entries, key, data);
        }

        function updateOrCreate(entity, key, data) {
            var entries = getEntity(entity);
            setEntity(entity, entries, key, data);
        }

        function destroy(entity, key) {
            var entries = getEntity(entity);
            delete entries[key];
            insertData(entity, entries);
        }

        function getEntity(entity) {
            var entries;
            createEntityIfDoesntExist(entity);
            entries = $window.localStorage.getItem(entity);
            return JSON.parse(entries);
        }

        function createEntityIfDoesntExist(entity) {
            if ($window.localStorage.getItem(entity) === null) {
                insertData(entity, {});
            }
        }

        function clearEntity(entity) {
            insertData(entity, {});
        }

        function setEntity(entity, entries, key, data) {
            data[storageKeyPropertyName] = key;
            entries[key] = data;
            insertData(entity, entries);
        }

        function insertData(entity, data) {
            $window.localStorage.setItem(entity, JSON.stringify(data));
        }
    }
})();
