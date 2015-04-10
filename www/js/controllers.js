angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, MenuService, ScanService) {
    
    $scope.menuItems = MenuService.all();
    
    $scope.scanBtn = ScanService.scan();
})

.controller('OrderCtrl', function($scope) {
    $scope.navTitle= 'Order';
})

.controller('OrdersCtrl', function($scope) {
    $scope.navTitle = 'Orders';
})

.controller('AboutCtrl', function($scope) {
    $scope.navTitle = 'About';
})

.controller('HistoryCtrl', function($scope) {
    $scope.navTitle = 'History';
});