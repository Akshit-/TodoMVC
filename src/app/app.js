(function () {

    "use strict";

    angular
        .module("TodoApp", [
            'ui.router',
            'TodoApp.todo'
        ])
        .config(function todoAppConfig($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

        })
        .run(function run() {

        })
        .controller('TodoAppCtrl', function TodoAppCtrl($scope, $location) {
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' By Akshit';
                }

            });
        })
    ;

})();
