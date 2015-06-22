/*
*Handles toast messages, uses showlongtop preset for now..
*/
(function() {
angular.module('app.services.toast', [])

.factory('Toast', ["$q", "$window", function($q, $window){
        //expects string
        //displayed in same position and layout regardless of device
        var toast = function(message){
            var deferred = $q.defer();
        try {
            //uses cordova plugin 
            $window.plugins.toast.showLongTop(message, 
                function (result) {
                    deferred.resolve(result);
                }, 
                function (error) {  // failure
                    deferred.reject(error);
                });
        }
        catch (exc) {
            deferred.reject(exc)
            console.log("fail");
        }
            return deferred.promise;
        }
        
    return{
        toast : toast
    }

}])
}())