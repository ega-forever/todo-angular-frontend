/**
 *@factory todoHelpers with task's requests
 */
angular.module('todoFactory', [])
    .factory('todoHelpers', function ($http, $httpParamSerializer, Session) {

        var requests = {
            add: function(item) {
                return {
                    method: 'POST',
                    url: "http://localhost:9000/add-task",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                    },
                    data: $httpParamSerializer(item)
                }
            },
            get: function() {
                return {
                    method: 'GET',
                    url: "http://localhost:9000/get-tasks"
                }
            },
            delete: function(item) {
                return {
                    method: 'DELETE',
                    url: "http://localhost:9000/remove-task/" + item.id
                }
            }
        };

        return {
            doGet: function(){
                return $http(requests.get())
            },
            doAdd: function(item){
                return $http(requests.add(item))
            },
            doRemove: function(item){
                return $http(requests.delete(item))
            }
        };
    });