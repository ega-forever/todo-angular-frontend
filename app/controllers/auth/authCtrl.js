/**
 *@controller auth controller
 * @inject authHelpers to share actions
 */

angular.module('auth', ['ngCookies', 'ngResource', 'authFactory'])
    .controller('authCtrl', function ($cookies, authHelpers, $state) {

        var _this = this;

        _this.username = "";
        _this.password = "";

        _this.register = function () {
            authHelpers.doRegister(_this.username, _this.password).then(function (data) {
                $cookies.put("access_token", data.data["x-token"]);
                $cookies.put("access_name", data.data.username);
                $state.transitionTo("tasks");
            });
        };


        _this.login = function () {
            authHelpers.doLogin(_this.username, _this.password).then(function (data) {

           console.log(data.data);
                $cookies.put("access_token", data.data["x-token"]);
                $cookies.put("access_name", data.data.username);

                $state.transitionTo("tasks");
                event.preventDefault();

            });
        }



    });
