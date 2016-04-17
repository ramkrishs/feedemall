/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$state', 'AuthenticationService', 'FlashService'];
    function SignupController($state, AuthenticationService, FlashService) {
        var vm = this;

        vm.register = register;
        
        (function initController() {
            // reset login status
            //AuthenticationService.ClearCredentials();
        })();

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    console.log(response);
                    if (response.data.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        };
    }

})();