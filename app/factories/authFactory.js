/**
 *@factory authFactory with requests
 */
angular.module('authFactory', [])
    .factory('authHelpers', function ($http, $httpParamSerializer) {

        var requests = {
            register: function(username, password) {
                return {
                    method: 'POST',
                    url: "http://localhost:9000/register",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                    },
                    data: $httpParamSerializer({
                        username: username,
                        password: password
                    })
                }
            },
            login: function(username, password) {
                return {
                    method: 'POST',
                    url: "http://localhost:9000/login",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                    },
                    data: $httpParamSerializer({
                        username: username,
                        password: password
                    })
                }
            }
        };

        return {
            doLogin: function(username, password){
                return $http(requests.login(username, password))
            },
            doRegister: function(username, password){
                return $http(requests.register(username, password))
            }
        };
    });