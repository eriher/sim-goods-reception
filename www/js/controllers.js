angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, MenuService) {
  // Form data for the login modal
  $scope.message = "hej";
  $scope.menuItems = MenuService.all();
});