/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthenticationService', 'FlashService','$rootScope'];
    function LoginController($state, AuthenticationService, FlashService,$rootScope) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status

            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    console.log("success");
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    //e.preventDefault();
                   // $timeout(()=>{$state.go('home')},0);
                    $state.go('home');
                } else {
                    console.log("fail");
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();