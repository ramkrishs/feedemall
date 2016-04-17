/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$state','$rootScope', 'FlashService'];
    function ProfileController(UserService, $state,$rootScope,FlashService) {
        var vm = this;
        console.log("in here");
        vm.profile = profile;
        vm.place = null;
        vm.res=null;
        (function initController() {
            vm.user=$rootScope.globals.currentUser;

        })();

        function profile() {
           // console.log(vm.place.formatted_address);



            vm.info.username=vm.user.username;
            //vm.info.address=""


            vm.dataLoading = true;
            UserService.profile(vm.info)
                .then(function (response) {
                    console.log(response);
                    if (response.data.success) {

                        FlashService.Success('post successfulddddddddddddddddddddddddd', true);
                        $state.go('home');
                    } else {
                        console.log(response.message);
                        FlashService.Error(response.data.message);
                        vm.dataLoading = false;
                    }
                });
        }

    }

})();
