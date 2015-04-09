angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $location, MenuService, $window) {
  // Form data for the login modal
    $scope.message = "hej";
    $scope.menuItems = MenuService.all();

    $scope.goTo = function(page) {
        $window.alert(page);
        $location.url('/'+ page);
    };
});