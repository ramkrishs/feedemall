/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .controller('CollectController', CollectController)
        .directive('myCustomer', function() {
            return {
                restrict: 'E',
                template: "<div>hi<div>"
            };
        });

    CollectController.$inject = ['$state', 'AuthenticationService','$rootScope', 'FlashService'];
    function CollectController($state, AuthenticationService, FlashService,$rootScope) {
        var vm = this;


        (function initController() {
            // reset login status
            vm.user=$rootScope.globals.currentUser;
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