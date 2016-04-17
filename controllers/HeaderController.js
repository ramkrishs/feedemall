/**
 * Created by pratima on 4/17/2016.
 */
/**
 * Created by pratima on 4/17/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$state', 'UserService', '$rootScope','$cookieStore'];
    function HeaderController($state,UserService, $rootScope,$cookieStore) {
        var vm = this;

        vm.logout = logout;

        (function initController() {
            vm.user=$rootScope.globals.currentUser;
        })();

        function logout() {

            delete $rootScope.globals;
            $cookieStore.remove('globals');
            $state.go('login');
        };
    }

})();