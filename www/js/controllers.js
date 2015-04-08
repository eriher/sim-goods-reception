angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $location, MenuService) {
  // Form data for the login modal
    $scope.message = "hej";
    $scope.menuItems = MenuService.all();
    
    $scope.goTo = function(page) {
        $scope.sideMenuController.toggleLeft();
        $location.url('/'+ page);
    };
});