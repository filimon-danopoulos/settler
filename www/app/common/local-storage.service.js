(function() {
    'use strict';

    angular.module('settler.common')
        .factory('localStorage', localStorageFactory);

    localStorageFactory.inject = ["$window"];
    function localStorageFactory($window) {
        return {
            read: read,
            create: create,
            update: update,
            destroy: destroy,
            updateOrCreate: updateOrCreate
        };

        function read(key) {
            var data = $window.localStorage.getItem(key);
            if (data === null) {
                throw new Error("Could not find: " + key);
            }
            return JSON.parse(data);
        }

        function create(key, data) {
            if ($window.localStorage.getItem(key) !== null) {
                throw new Error("Could not create "+key+" the key already exists.");
            }
            $window.localStorage.setItem(key, JSON.stringify(data));
        }

        function update(key, data) {
            if ($window.localStorage.getItem(key) === null) {
                throw new Error("Could not update "+key+" the key doesn't exists.");
            }
            $window.localStorage.setItem(key, JSON.stringify(data));
        }

        function destroy(key) {
            $window.localStorage.removeItem(key);
        }

        function updateOrCreate(key, data) {
            $window.localStorage.setItem(key, JSON.stringify(data));
        }
    }

})();
