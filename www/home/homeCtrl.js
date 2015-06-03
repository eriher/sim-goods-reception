(function(){angular.module('app.homeCtrl', ['app.translate'])
.controller('HomeCtrl', function($scope, $state, DataStorage, $filter, $translate, $ionicLoading, data) {

    $scope.$on('$ionicView.beforeEnter',function(){
        $ionicLoading.hide()
    });
    $scope.date = new Date().toJSON().slice(0,10);
    $scope.dispatches = data();
                                 
    $scope.goTo = function(id) {
        console.log(id);
        $state.go('menu.pallets', {dispatch : id });
    }
    $scope.items =  
    [{
         value: "",
        label: "---"
    }]
    for(var x in data()[0]){
        if(!(x === "pallets" || x == "$$hashKey"))
            $scope.items.push({value: x, label: x});
    }
    $scope.type = $scope.items[0];
    
    $scope.refresh= function(){
        DataStorage.sync().then(function(success){
            console.log("sync complete")
            $scope.$broadcast('scroll.refreshComplete');
            $scope.dispatches = data();
            console.log(data());
        });
    };
})
}())
