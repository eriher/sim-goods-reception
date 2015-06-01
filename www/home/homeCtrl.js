(function(){angular.module('app.homeCtrl', ['app.translate'])
.controller('HomeCtrl', function($scope, $state, DataStorage, $filter, $translate, $ionicLoading, data) {

    $scope.$on('$ionicView.beforeEnter',function(){
        $ionicLoading.hide()
    });
    
    $scope.dispatches = data;
                                 
    $scope.goTo = function(id) {
        console.log(id);
        $state.go('menu.pallets', {dispatch : id });
    }
    $scope.items =  
        [{
            value: "",
            label: "---"
        },
        {
            value: "dispatch",
            label: "dispatch"
        },
        {
            value: "status",
            label: "status"
         },
          {
             value: "supplierID",
             label: "supplier"
          },
         {
             value: "customerID",
             label: "customerID"
         }]
    $scope.type = $scope.items[0];
    
    $scope.refresh= function(){
        DataStorage.sync().then(function(success){
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
})
}())
