(function() {
angular.module('app.services.toast', [])

.factory('Toast', ["$q", "$window", function($q, $window){
        
        var toast = function(message){
            var deferred = $q.defer();
        try {
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