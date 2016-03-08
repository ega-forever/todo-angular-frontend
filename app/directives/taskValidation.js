/**
 * @directive inputValidation to validate task input
 * @inject factory errorMessageService
 */

angular.module('todoValidation', ['errorsFactory'])
    .directive('inputValidation', function ($parse, errorMessageService) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                scope.$watch(attrs.ngModel, function (value) {

                    var unValidated = [];

                    if (value == null || value.length < 5) {
                        modelCtrl.$setValidity(errorMessageService.low, false);
                        unValidated.push(errorMessageService.low);
                    }

                    var tasks = $parse(attrs.inputValidation)(scope).tasks;
                    if (_.filter(tasks, {name: value}).length != 0) {
                        modelCtrl.$setValidity(errorMessageService.exists, false);
                        unValidated.push(errorMessageService.exists);
                    }

                    _.chain(errorMessageService).values().pullAll(unValidated).forEach(function (s) {
                        modelCtrl.$setValidity(s, true);
                    }).value();


                });

            }
        };
    });