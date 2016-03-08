/**
 * @entryPoint app entry point
 */
(function(angular) {
    angular.module('app', ['todo', 'todoValidation', 'auth', 'authService', 'ui.router', 'authFactory', 'todoFactory'])
        .constant('_', window._)
        .run(function ($rootScope, Session, $state) {
            $rootScope._ = window._;
            $rootScope.session = Session;

            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                if (toState.authenticate && !Session.isAuthed()){
                    $state.transitionTo("auth");
                    event.preventDefault();
                }

                if(Session.isAuthed() && toState.name == "auth"){
                    $state.transitionTo("tasks");
                    event.preventDefault();
                }

            });


        })

        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.interceptors.push('authInterceptor');

            $urlRouterProvider.otherwise('/tasks');

            $stateProvider
                .state('tasks', {
                    url: '/tasks',
                    templateUrl: 'partials/tasks.html',
                    controller: 'todoCtrl as vm',
                    authenticate: true
                })

                .state('auth', {
                    url: '/auth',
                    templateUrl: 'partials/auth.html',
                    controller: 'authCtrl as auth',
                    authenticate: false
                })
        });

})(angular);