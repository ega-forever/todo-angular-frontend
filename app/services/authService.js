/**
 *@service authInterceptor to handle 401 error
 *@factory Session as singleton to auth details
 */
angular.module('authService', ['ngCookies', 'ui.router'])

    .service('authInterceptor', function($q, triggers) {
        var _this = this;

        _this.responseError = function(response) {
            if (response.status == 401){
                triggers.dropTrigger();
            }
            return $q.reject(response);
        };

        _this.request = function (config) {
            config.headers['x-token'] = triggers.getToken();
            return config;
        }


    })

    .factory('Session', function($cookies, $state, triggers){
        var _this = this;

        _this.isAuthed = function(){
            return $cookies.get("access_token") != null;
        };

        _this.getUsername = function(){
            return $cookies.get("access_name");
        };

        _this.getToken = function(){
            return $cookies.get("access_token");
        };

        _this.delete = function(){
            $cookies.remove("access_token");
            $cookies.remove("access_name");
            $state.transitionTo("auth");
            event.preventDefault();
        };


        triggers.dropTrigger = _this.delete;
        triggers.getToken = _this.getToken;

        return {
            isAuthed: _this.isAuthed,
            getUsername: _this.getUsername,
            getToken: _this.getToken,
            drop: _this.delete
        }

    })


.factory('triggers', function(){

        var _this = this;

        _this.dropTrigger = function(){};
        _this.getToken = function(){};


        return {
            dropTrigger: _this.dropTrigger,
            getToken: _this.getToken
        };


    });