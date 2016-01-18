/**
 * Created by akshit on 10/11/15.
 */

(function () {

    "use strict";

    angular
        .module('todo.factory', [])
        .factory('TodoDataStorageFactory', function ($http, $q) {

            var todos_data_id = "todos_store";

            var dataStorageFactory = {};

            var initialJSONData = function () {
                var defer = $q.defer();

                $http.get('../sample.json')
                    .success(function (data) {
                        localStorage.setItem(todos_data_id, JSON.stringify(data));
                        defer.resolve(data);
                    })
                    .error(function () {
                        defer.reject('could not find sample.json');
                    });


                return defer.promise;
            }

            dataStorageFactory.storeTodos = function (todos) {
                localStorage.setItem(todos_data_id, JSON.stringify(todos));
            }

            dataStorageFactory.loadTodos = function () {

                var storage = JSON.parse(localStorage.getItem(todos_data_id) || '[]');

                //loading from local json file if no localstorage data
                if (storage.length == 0)
                    return initialJSONData();

                return storage;

            }

            return dataStorageFactory;

        })

    ;

})();


