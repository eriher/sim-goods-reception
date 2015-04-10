angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $location, MenuService, $window) {
  // Form data for the login modal
    $scope.message = "hej";
    $scope.menuItems = MenuService.all();

    $scope.goTo = function(page) {
        $window.alert(page);
        $location.url('/'+ page);
    };
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