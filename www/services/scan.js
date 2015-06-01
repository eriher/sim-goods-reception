(function() {
angular.module('app.services.scan', [])

.factory('Scan', function($state, DataStorage){
    
    var scan = function(){
        try {
            cordova.plugins.barcodeScanner.scan(
                function (success) {
                    if(!success.cancelled){
                        var scanId = success.text;
                        switch(scanId.charAt(0)) {
                                case 'N' :
                                    scanId = scanId.replace('N','');
                                    if(DataStorage.dispatchExist(scanId))
                                    {
                                        alert("dispatch exists"+scanId)
                                        $state.go('menu.pallets', {dispatch : scanId});
                                    }
                                    else
                                        alert("no dispatch found")
                                    break;
                                case 'S' :
                                    scanId = scanId.replace('S','');
                                    var result = DataStorage.palletExist(scanId);    
                                    if(result)
                                        $state.go('menu.pallets',{dispatch: result, pallet: scanId})
                                    else
                                        alert("no pallet found")
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
            alert("Scan failed");
        }
        }
    return{
        scan : scan
    }
})
}())