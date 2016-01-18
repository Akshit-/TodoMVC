/**
 * Created by akshit on 10/11/15.
 */

(function () {

    "use strict";

    angular
        .module('common.directives', [])
        .directive('focusMe', function ($timeout) {
            return {
                scope: {trigger: '=focusMe'},
                link: function (scope, element) {
                    scope.$watch('trigger', function (value) {
                        if (value === true) {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        })

})();


