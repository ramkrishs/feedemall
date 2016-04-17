/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .controller('DonateController', DonateController);

    DonateController.$inject = ['UserService', '$state','$rootScope', 'FlashService'];
    function DonateController(UserService, $state,$rootScope,FlashService) {
        var vm = this;
        console.log("in here");
        vm.donate = donate;
        vm.place = null;
        vm.res=null;
        (function initController() {
            vm.user=$rootScope.globals.currentUser;

        })();

        function donate() {
        console.log(vm.place.formatted_address);



            vm.info.username=vm.user.username;
            //vm.info.address=""
            vm.info.lat='32.772825';
            vm.info.long='-96.80186900000001';
            vm.info.zipcode='75080';
            vm.info.address=vm.place.formatted_address;

            vm.dataLoading = true;
            UserService.donate(vm.info)
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
