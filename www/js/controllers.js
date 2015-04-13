angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, MenuService, ScanService, $location, $window) {
    
    $scope.menuItems = MenuService.all();
    
    $scope.scanBtn = ScanService.scan();
    
    $scope.goTo = function(page) {
        var url = $location.url();
        $location.url(url + '/' + page);
        };
})

.controller('OrderCtrl', function($scope, $stateParams) {
    $scope.navTitle= 'Order';
    $scope.id = $stateParams.orderId;
})

.controller('OrdersCtrl', function($scope, OrdersService) {
    $scope.navTitle = 'Orders';
    $scope.orderItems = OrdersService.all();
})

.controller('AboutCtrl', function($scope) {
    $scope.navTitle = 'About';
})

.controller('HistoryCtrl', function($scope) {
    $scope.navTitle = 'History';
});