/**
 * Created by akshit on 10/11/15.
 */

(function(){
    "use strict";

    angular.module("todo.config",[])
    .config(function config($stateProvider) {
        $stateProvider.state('todo', {
            url: '/',
            views: {
                "main": {
                    controller: 'TodoController',
                    templateUrl: '/todoMVCAppModular/src/app/todo/todo.tpl.html'

                }
            },
            resolve:{
                InitializeData: function(TodoDataStorageFactory) {
                    return TodoDataStorageFactory.loadTodos();
                }
            },
            data: {pageTitle: 'Celonis Sample'}

        });
    });

})();