/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .controller('CollectController', CollectController);

    CollectController.$inject = ['UserService', '$state','$rootScope', 'FlashService','$scope'];
    function CollectController(UserService, $state,$rootScope,FlashService,$scope) {
        var vm = this;
        vm.restas = [];
        vm.loc={};
       
        console.log("in here");
        vm.collect = collect;
       
        vm.res=null;
         
        (function initController() {
            vm.user=$rootScope.globals.currentUser;
            
            
        })();

        function collect() {
                vm.loc.lat ="32.7692403" ;
                vm.loc.lng ="-96.7977447" ;
             console.log(vm.loc.lat);
            vm.dataLoading = true;
            UserService.collect(vm.loc)
                .then(function (response) {
                    //console.log(response);
                    if (response.data) {

                        vm.restas=response.data;
                        console.log(vm.restas);
                        //   FlashService.Success('post successfulddddddddddddddddddddddddd', true);
                        // $location.path('/activity');
                    } else {
                        console.log(response.message);
                        //FlashService.Error(response.data.message);
                        vm.dataLoading = false;
                    }
                });
        }

    }

})();
