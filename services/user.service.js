/**
 * Created by pratima on 4/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('FeedApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        
        service.donate=donate;
        service.collect = collect;
        service.profile=profile;
       
        
        return service;

        

        function donate(info) {


            var req = {
                method: 'POST',
                url: 'http://feedemall.org:8080/feedemall/donate',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param({  restName:info.restName, address: info.address, phoneno: info.phoneno,availableFor:info.availableFor,until:info.until,zipcode:info.zipcode,lat:info.lat,long:info.long,description:info.description})
            }
            console.log(req);
            return $http(req)
                .success(function (response) {
                    callback(response);
                    console.log(response);
                });

            //return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function profile(info) {


            var req = {
                method: 'POST',
                url: 'http://feedemall.org:8080/feedemall/profile',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param({  name:info.name, email: info.email,phoneno:info.phoneno,address:info.address,zipcode:info.zipcode,username:info.username })
            }
            console.log("request : ");
            console.log(req);
            return $http(req)
                .success(function (response) {
                    callback(response);
                    console.log(response);
                });

            //return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }
        


        function collect(loc) {


            var req = {
                method: 'POST',
                url: 'http://feedemall.org:8080/feedemall/collect',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param({  lat:loc.lat, long: loc.lng })
            }
            // console.log(req);
            return $http(req)
                .success(function (response) {
                    callback(response);
                    console.log(response);
                });

            //return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }


        

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();