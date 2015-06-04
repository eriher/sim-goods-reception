(function(){angular.module('app.homeCtrl', ['app.translate'])
.controller('HomeCtrl', function($scope, $state, DataStorage, $translate, dispatches) {

    $scope.date = new Date().toJSON().slice(0,10);
    $scope.dispatches = dispatches();
                          
    $scope.goTo = function(id) {
        console.log(id);
        $state.go('menu.pallets', {dispatch : id });
    }
    $scope.items =  
    [{
         value: "",
        label: "---"
    }]
    for(var x in $scope.dispatches[0]){
        if(!(x === "pallets" || x == "$$hashKey"))
            $scope.items.push({value: x, label: x});
    }
    $scope.type = $scope.items[0];
    
    $scope.refresh= function(){
        DataStorage.sync().then(function(success){
            $scope.$broadcast('scroll.refreshComplete');
            $scope.dispatches = dispatches();
        });
    };
})
}())
