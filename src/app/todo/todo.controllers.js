/**
 * Created by akshit on 10/10/15.
 */

(function () {
    "use strict";

    angular
        .module('todo.controllers', [])
        .controller('TodoController', ['$scope', '$filter', '$location', 'TodoDataStorageFactory', 'TodoDataService', 'InitializeData',
            function TodoController($scope, $filter, $location, TodoDataStorageFactory, TodoDataService, InitializeData) {

                var dataStorage = TodoDataStorageFactory; //data storage factory
                var dataService = TodoDataService; //data manipulation service model
                var todos = [];

                $scope.todos = InitializeData;  //initializing data using 'InitializeData' resolve
                todos = $scope.todos;
                dataService.initialize(todos);

                //text for new todo being added
                $scope.newTitle = null;

                //Param for keeping track of which filter is clicked, default: all
                $scope.whichFilter = 'all';
                //filter to be applied to our todo list, default: no filtering
                $scope.todoFilter = {};

                //filtering out pending todos
                $scope.totalPendingTodos = $filter('filter')(todos, {done: false}).length;

                //handle activation of filter link
                $scope.addFilter = function (flag) {
                    if (flag == 'all') {
                        $scope.whichFilter = 'all';
                        $scope.todoFilter = {};

                    }
                    else if (flag == 'active') {
                        $scope.todoFilter = {done: false};
                        $scope.whichFilter = 'active';

                    } else if (flag == 'completed') {
                        $scope.todoFilter = {done: true};
                        $scope.whichFilter = 'completed';

                    }

                }

                $scope.addTODO = function () {

                    //edge condition: skip for empty strings
                    if ($scope.newTitle.length == 0)
                        return;

                    //tracking pending todos count
                    $scope.totalPendingTodos++;

                    todos = dataService.addTodo($scope.newTitle);

                    //store todos in DB
                    dataStorage.storeTodos(todos);

                    $scope.newTitle = null;


                }

                //open a todo for editing by using "editing" key
                $scope.editTODO = function (todo) {

                    todo.editing = true;

                }

                //called after todo was edited
                $scope.editingCompleted = function (todo) {

                    todo.editing = false;

                    //update todos in DB
                    dataStorage.storeTodos(todos);

                }

                //handle deleting of a Todo
                $scope.removeTODO = function (todo) {

                    //tracking pending todos count
                    if (!todo.done)
                        $scope.totalPendingTodos--;

                    todos = dataService.removeTodo(todo);

                    //store todos in DB
                    dataStorage.storeTodos(todos);

                }

                //handling toggling "done" state
                $scope.toggleTODO = function (todo) {

                    //tracking pending todos count
                    if (!todo.done)
                        $scope.totalPendingTodos++;
                    else
                        $scope.totalPendingTodos--;

                    //update todos in DB
                    dataStorage.storeTodos(todos);

                }

                //toggling all
                $scope.toggleAllTodos = function (allCompleted) {

                    if (allCompleted)
                        $scope.totalPendingTodos = todos.length;
                    else
                        $scope.totalPendingTodos = 0;

                    todos = dataService.toggleAll(allCompleted);
                    //store todos in DB
                    dataStorage.storeTodos(todos);

                }

                //clearing all completed todos
                $scope.deleteCompletedTodos = function () {

                    todos = dataService.deleteCompletedTodos();
                    $scope.todos = todos; //list changed after filtering, so need to reference again
                    //store todos in DB
                    dataStorage.storeTodos(todos);
                }


            }]);


})();