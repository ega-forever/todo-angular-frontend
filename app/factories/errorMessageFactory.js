/**
 *@factory errorMessageService with error messages on task input
 */
angular.module('errorsFactory', [])
    .factory('errorMessageService', function () {

        var messages = {
            exists: 'already exists',
            low: 'task name must be at least 5 characters long'
        };

        return messages;
    });