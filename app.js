/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';
angular
    .module('FeedApp', ['ui.router','ngCookies', 'ngAnimate','uiRouterStyles'])

    .config(function($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                name:'home',
                url: '/',
                views: {
                    'header': { templateUrl: './views/partials/header.html' },
                    'body': { templateUrl: './views/home.html'},
                    'footer': { templateUrl: './views/partials/footer.html' }
                },
                module: 'private'
            })
            .state('home/:username/:password', {
                name:'home',
                url: '/',
                views: {

                    'header': { templateUrl: './views/partials/header.html' },
                    'body': { templateUrl: './templates/home.html'},
                    'footer': { templateUrl: './views/partials/footer.html' }
                },
                module: 'private'
            })
            .state('login',{
                name:'login',
                url:'/login',
                views: {
                    'body': { templateUrl: './views/auth/login.html',
                        controller: 'LoginController',
                        controllerAs: 'vm',
                        data: {
                            css:[ 'index.css']
                            }
                    }

                },

                module: 'public'
            })
            .state('register',{
                name:'register',
                url:'/register',
                views: {
                    'body': { templateUrl: './views/auth/register.html',
                        controller: 'SignupController',
                        controllerAs: 'vm',
                    data: {
                            css: 'index.css'
                            }}

                },
                module: 'public'
            })
            .state('donate',{
                name:'donate',
                url:'/home/donate',
                views: {

                    'header': { templateUrl: './views/partials/header.html' },
                    'body': { templateUrl: './views/donate.html'},
                    'footer': { templateUrl: './views/partials/footer.html' }
                },
                module: 'private'
            })
            .state('collect',{
                name:'collect',
                url:'/home/collect',
                views: {

                    'header': { templateUrl: './views/partials/header.html' },
                    'body': { templateUrl: './views/collect.html'},
                    'footer': { templateUrl: './views/partials/footer.html' }
                },
                module: 'private'
            })
            .state('profile',{
                name:'profile',
                url:'/home/profile',
                views: {

                    'header': { templateUrl: './views/partials/header.html' },
                    'body': { templateUrl: './views/profile.html'},
                    'footer': { templateUrl: './views/partials/footer.html' }
                },
                module: 'private'
            })

            
    })
    .run(['$state', '$cookieStore', '$rootScope', function($state, $cookieStore, $rootScope) {

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                console.log("cookie");
               // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }
            if (toState.module === 'private' && !$rootScope.globals.currentUser) {
                // If logged out and transitioning to a logged in page:
                console.log(toState);
                e.preventDefault();
                $state.go('login');
            } else if (toState.module === 'public' && $rootScope.globals.currentUser) {
                // If logged in and transitioning to a logged out page:
                e.preventDefault();
                $state.go('home');
            };
        });
    }])
    .controller('FeedController', function( $scope, $window, $state )
    {
        $scope.transition = 'slide-left';
        $scope.tabs = ['tab1', 'tab2', 'tab3', 'tab4'];
        $scope.currentIndex = -1;
        $scope.maxIndex = $scope.tabs.length;
        $scope.left = false;

        next();

        function next()
        {
            $scope.currentIndex = $scope.currentIndex+1 < $scope.maxIndex ? $scope.currentIndex+1 : 0;
            var name = $scope.tabs[$scope.currentIndex];
           // $state.go( '/' );
        }

        $scope.left = function()
        {
            $scope.transition = 'slide-left';
            next();
        }

        $scope.right = function()
        {
            $scope.transition = 'slide-right';
            next();
        }

        $scope.top = function()
        {
            $scope.transition = 'slide-top';
            next();
        }

        $scope.bottom = function()
        {
            $scope.transition = 'slide-bottom';
            next();
        }
    });


})();