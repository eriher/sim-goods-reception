(function(){angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state, MenuService, ScanService, ToastService, $ionicHistory, $location) {
    
    $scope.menuItems = MenuService.all();
        $scope.back = function() {
            //$ionicHistory.goBack();
            

            var url = $location.path();
            url = url.slice(0,url.lastIndexOf('/'));
        if(url == '/menu/home'){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
                });
        } 
        else{
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
            });
        }
            $location.path(url).replace();
        }
    $scope.menuClick = function(dest){
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate : true
        }); 
        $state.go("menu."+dest);
    }
    
    $scope.scanBtn = function(){
        ScanService.scan().then(
            function(result){
            //scan not cancelled by 
            if(!result.result.cancelled){
                alert("not cancelled"+result.result.text);
                var scanId = result.result.text;
                switch(scanId.charCodeAt(0)) {
                        case 78 :
                            scanId = scanId.replace('N','');
                            alert(scanId)
                            $state.go('menu.orders', {dispatchId : scanId });
                             break;
                        case 65 :
                            scanId = scanId.replace('A', '');
                            alert(scanId)
                            $state.go('menu.order', {dispatchId : 5, orderId : scanId});
                            break;
                };

            }
            else{
                alert("scan cancelled");
            }},
                function(reject){
                    alert("scan cancelled");
                });
            }


})

.controller('OrderCtrl', function($scope, $stateParams, $ionicHistory) {
    $scope.navTitle= 'Order Id: '+$stateParams.orderId;
    $scope.id = $stateParams.orderId;
    //alert($ionicHistory.backView());
    //$ionicHistory.clearHistory();
    //$ionicHistory.backView() = 'menu/home/1';
    
    //$ionicHistory.currentView($ionicHistory.backView());
    
})

.controller('OrdersCtrl', function($scope, $stateParams, OrdersService, $state) {
    var id = $stateParams.dispatchId;
    $scope.navTitle= 'Dispatch Id: '+id;
    $scope.message = OrdersService.name(id);
    $scope.orderItems = OrdersService.items();
    $scope.pallets = OrdersService.pallets();
    
    $scope.goTo = function(id2) {
        $state.go('menu.order', {dispatchId: id, orderId : id2 });
    }
    
})

.controller('HomeCtrl', function($scope, HomeService, $state) {
    $scope.navTitle = 'Home';
    $scope.dispatchNotes = HomeService.all();
    $scope.goTo = function(id) {
        $state.go('menu.orders', {dispatchId : id });
    }
    
    $scope.refresh= function(){
        $scope.deliveryNotes = HomeService.test();
        $scope.$broadcast('scroll.refreshComplete');
        /*var connetionStatus = HomeService.getConnection();
        if(connetionStatus == 'No network connection' || connetionStatus =='WiFi connection') {
             $scope.message = connetionStatus;
        }*/
    };
})

.controller('AboutCtrl', function($scope) {
    $scope.navTitle = 'About';
})

.controller('HistoryCtrl', function($scope) {
    $scope.navTitle = 'History';
})
.controller('SigninCtrl', function($scope, $state, SigninService, $window) {
    $scope.formData = {};
    
    $scope.signIn = function(user){
        //if(SigninService(user.Name, user.Password))
        {  
            $state.go('menu.home');
            
        }
    };
});
}());
