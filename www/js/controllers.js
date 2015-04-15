angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, MenuService, ScanService) {
    
    $scope.menuItems = MenuService.all();
    
    $scope.scanBtn = function(){
        ScanService.scan().then(function(result){
            //scan not cancelled by user
            if(result.result.cancelled === false)
                alert("id: "+result.result.text+", format: "+result.result.format);
            else
                alert("Scan cancelled");
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

.controller('OrdersCtrl', function($scope, OrdersService, $location) {
    $scope.navTitle = 'Orders';
    $scope.orderItems = OrdersService.all();
    $scope.goTo = function(page) {
        var url = $location.url();
        $location.url(url + '/' + page);
        };
    
    $scope.refresh= function(){
        $scope.orderItems = OrdersService.test();
        $scope.$broadcast('scroll.refreshComplete');
    };
    
})

.controller('AboutCtrl', function($scope) {
    $scope.navTitle = 'About';
})

.controller('HistoryCtrl', function($scope) {
    $scope.navTitle = 'History';
})
.controller('SigninCtrl', function($scope, $state) {
    
    $scope.signIn = function(user){
            $state.go('menu.orders');
        };
    
    
});