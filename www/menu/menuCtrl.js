(function(){ angular.module('app.menuCtrl', [])
.controller('MenuCtrl', function($scope, $state, Menu, Scan, $ionicHistory, Signin, $ionicViewSwitcher, DataStorage) {

    $scope.menuItems = Menu.items();
    // Kommentera bort userName för testning
    $scope.userName = JSON.parse(window.localStorage['user']).username;
    
    $scope.back = function() {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
                });
 
            $state.go('menu.home')
        }
    
    $scope.menuClick = function(dest){
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate : true
        });
        if(dest == 'signin')
        {
            Signin.logout();
        }
        $state.go(dest);
    }
    
    $scope.scanBtn = function(){
        
                Scan.scan().then(
            function(result){
            if(!result.cancelled){
                var scanId = result.text;
                switch(scanId.charAt(0)) {
                        case 'N' :
                                    console.log("N")
                                    if(DataStorage.dispatchExist(scanId) == scanId)
                                        $state.go('menu.pallets', {dispatchId : scanId})
                                    break;
                        case 'S' :
                                    var pallet = DataStorage.palletExist(scanId);    
                                    if(pallet[0] == scanId)
                                        $state.go('menu.pallets',{dispatchId: pallet[1], palletId: pallet[0]})
                                    break;
                }
            }
            else{
                alert("Scan cancelled");
            }
            },function(reject){console.log("Scan failed:"+reject)})
    }
})
}())