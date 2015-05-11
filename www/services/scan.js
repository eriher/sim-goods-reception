(function() {
angular.module('app.services.scan', [])

.factory('Scan', function($q){
        
        var scan = function(){

        var deferred = $q.defer();
        try {
            cordova.plugins.barcodeScanner.scan(
                function (success) {
                    deferred.resolve(success);
                }, 
                function (fail) {
                    deferred.reject(fail.toString());
                }
            );
        }
        catch (exc) {
            deferred.reject({'error':true, 'result': 'exception: ' + exc.toString()});
        }
        return deferred.promise;
        }
    return{
        scan : scan
    }

})
}())