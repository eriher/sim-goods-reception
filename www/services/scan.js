(function() {
angular.module('app.services.scan', [])

.factory('Scan', function(){
        
        var scan = function(){
        try {
            cordova.plugins.barcodeScanner.scan(
                function (success) {
                    if(!success.cancelled){
                var scanId = result.text;
                switch(scanId.charAt(0)) {
                        case 'N' :
                                    if(DataStorage.dispatchExist(scanId))
                                        $state.go('menu.pallets', {dispatchId : scanId})
                                    break;
                        case 'S' :
                                    var result = DataStorage.palletExist(scanId);    
                                    if(result)
                                        $state.go('menu.pallets',{dispatchId: result, palletId: scanId})
                                    break;
                }
            }
            else{
                alert("Scan cancelled");
            }
                }, 
                function (fail) {
                    console.log("Scan failed:"+fail)
                }
            );
        }
        catch (exc) {
            deferred.reject({'error':true, 'result': 'exception: ' + exc.toString()});
        }
        }
    return{
        scan : scan
    }
})
}())