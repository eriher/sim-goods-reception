(function() {
angular.module('app.services.scan', [])

.factory('Scan', ["$state", "$ionicViewSwitcher", "DataStorage", "Toast", function($state, $ionicViewSwitcher, DataStorage, Toast){
    
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
                                        $ionicViewSwitcher.nextDirection("forward"); 
                                        $state.go('menu.pallets', {dispatch : scanId});
                                    }
                                    else
                                        Toast.toast("no dispatch found");
                                    break;
                                case 'S' :
                                    scanId = scanId.replace('S','');
                                    var result = DataStorage.palletExist(scanId);    
                                    if(result)
                                    {   
                                        $ionicViewSwitcher.nextDirection("forward"); 
                                        $state.go('menu.pallets',{dispatch: result, pallet: scanId})
                                    }
                                    else
                                        Toast.toast("no pallet found");
                                    break;
                                default :
                                    Toast.toast("invalid scan");
                                    break;
                        }
                    }
                    else{
                        Toast.toast("Scan cancelled");
                    }
                }, 
                function (fail) {
                    console.log("Scan failed:"+fail)
                }
            );
        }
        catch (exc) {
            Toast.toast("Scan failed");
        }
        }
    return{
        scan : scan
    }
}])
}())