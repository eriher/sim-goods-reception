angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, MenuService, ScanService) {
    
    $scope.menuItems = MenuService.all();
    
    $scope.scanBtn = function(){
        ScanService.scan().then(function(result){
            //scan not cancelled by user
                alert("id: "+result.result.text+", format: "+result.result.format+", cancelled: "+result.result.cancelled);
        },
                               function(reason){
                                alert(reason);
                                })
    };


})

.controller('OrderCtrl', function($scope, $stateParams) {
    $scope.navTitle= 'Order';
    $scope.id = $stateParams.orderId;
})

.controller('OrdersCtrl', function($scope, $stateParams, OrdersService, $location) {
    var id = $stateParams.ordersId;
    $scope.navTitle= 'Orders';
    $scope.message = OrdersService.name(id);
    $scope.orderItems = OrdersService.items();
    
    $scope.goTo = function(page) {
        var url = $location.url();
    
        $location.url(url + '/' + page);
        };
})

.controller('HomeCtrl', function($scope, HomeService, $location, $ionicPopup) {
    $scope.navTitle = 'Home';
    $scope.deliveryNotes = HomeService.all();
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
