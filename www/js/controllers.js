angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state, MenuService, ScanService, ToastService) {
    
    $scope.menuItems = MenuService.all();
    
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
                            $state.go('menu.orders', {ordersId : scanId });
                             break;
                        case 65 :
                            scanId = scanId.replace('A', '');
                            alert(scanId)
                            $state.go('menu.order', {ordersId : 5, orderId : scanId});
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

.controller('OrderCtrl', function($scope, $stateParams) {
    $scope.navTitle= 'Order Id: '+$stateParams.orderId;
    $scope.id = $stateParams.orderId;
})

.controller('OrdersCtrl', function($scope, $stateParams, OrdersService, $location) {
    var id = $stateParams.ordersId;
    $scope.navTitle= 'Dispatch Id: '+id;
    $scope.message = OrdersService.name(id);
    $scope.orderItems = OrdersService.items();
    $scope.pallets = OrdersService.pallets();
    
    $scope.goTo = function(page) {
        var url = $location.url();
    
        $location.url(url + '/' + page);
        };
    
})

.controller('HomeCtrl', function($scope, HomeService, $location, $ionicPopup) {
    $scope.navTitle = 'Home';
    $scope.dispatchNotes = HomeService.all();
    $scope.goTo = function(page) {
        var url = $location.url();
        $location.url(url + '/' + page);
        };
    
    $scope.refresh= function(){
        $scope.deliveryNotes = HomeService.test();
        $scope.$broadcast('scroll.refreshComplete');
        var connetionStatus = HomeService.getConnection();
        if(connetionStatus == 'No network connection' || connetionStatus =='WiFi connection') {
             $scope.message = connetionStatus;
        }
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
