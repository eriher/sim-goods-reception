(function(){angular.module('app.homeCtrl', ['app.translate'])
.controller('HomeCtrl', ["$scope", "$state", "DataStorage", "$translate", "dispatches", "$ionicActionSheet" , function($scope, $state, DataStorage, $translate, dispatches, $ionicActionSheet) {
 
    $scope.date = new Date().toJSON().slice(0,10);
    $scope.dispatches = dispatches();                   
    $scope.goTo = function(id) {
        console.log(id);
        $state.go('menu.pallets', {dispatch : id });
    }
    $scope.items =  
    [{
         value: "",
        label: "---",
        text: "---",
    }]
    for(var x in $scope.dispatches[0]){
        if(!(x === "pallets" || x == "$$hashKey"))
            $scope.items.push({value: x, label: x, text: x});
    }
    $scope.type = $scope.items[0];
    
    $scope.refresh= function(){
        DataStorage.sync().then(function(success){
            $scope.$broadcast('scroll.refreshComplete');
            $scope.dispatches = dispatches();
        });
    };
            $scope.show = function() {
           var hideSheet = $ionicActionSheet.show({
                     buttons: $scope.items,
                     titleText: "filter",
                     cancelText: "cancel",
                     cancel: function() {
                          hideSheet();
                        },
                     buttonClicked: function(index) {
                                        $scope.type = $scope.items[index];
                       return true;
                     }
           });
        }
    
}])
}())
