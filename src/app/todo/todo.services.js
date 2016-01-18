/**
 * Created by akshit on 10/11/15.
 */

(function () {

    "use strict";

    angular
        .module('todo.services', [])
        .service('TodoDataService', function () {
            var list = [];
            var id = 1; //default value

            //template called for new todo generation
            function todoTemplate(){
                return {
                    id: id++,
                    done: false,
                    title: ""
                }
            }

            //initliaze data service module
            var init = function(items){
                list = items;

                //id is based upon last added todo
                if(list.length >= 1){
                    id = list[list.length-1].id + 1;
                }

                return list;

            }

            //retrieve data list
            var getList = function(){
                return list;
            }

            //adding new item to the list
            var addItem = function (title) {
                var item = new todoTemplate();
                item.title = title;
                list.push(item);

                return list;
            }

            //removing a item
            var removeItem = function (item) {

                list.splice(list.indexOf(item), 1);

                return list;
            }

            //toggle 'done' property for all items
            var toggleAllItems = function(done){

                list.forEach(function(item){
                    item.done = !done;
                });

                return list;
            }

            //filtering out completed items
            var deleteCompletedItems = function(){

                list = list.filter(function (item) {
                    return !item.done;
                });

                return list;

            }

            return {
                initialize: init,
                getTodoList: getList,
                addTodo: addItem,
                removeTodo: removeItem,
                toggleAll: toggleAllItems,
                deleteCompletedTodos: deleteCompletedItems
            };


        })

    ;

})();


