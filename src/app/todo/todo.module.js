/**
 * Created by akshit on 10/10/15.
 */

(function () {

    "use strict";

    angular
        .module('TodoApp.todo', [
            'common.directives',
            'todo.config',
            'todo.factory',
            'todo.services',
            'todo.controllers'
        ]);


})();