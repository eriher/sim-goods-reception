(function(){angular.module('app.homeCtrl', ['app.translate'])
.controller('HomeCtrl', ["$scope", "$state", "DataStorage", "$translate", "dispatches", "$ionicActionSheet" , function($scope, $state, DataStorage, $translate, dispatches, $ionicActionSheet) {
 
    $scope.date = new Date().toJSON().slice(0,10);
    $scope.dispatches = dispatches();                   
    $scope.goTo = function(id) {
        console.log(id);
        $state.go('menu.pallets', {dispatch : id });
    }
    
    $scope.refresh= function(){
        DataStorage.sync().then(function(success){
            $scope.$broadcast('scroll.refreshComplete');
            $scope.dispatches = dispatches();
        });
    };
    $scope.items =  
    [{
        value: "",
        label: "------",
        text: "------",
    },
    {
        value: "dispatch",
        label: "dispatch",
        text: "dispatch",
    },
    {
        value: "status",
        label: "status",
        text: "status",
    },
    {
        value: "customerID",
        label: "customerID",
        text: "customerID",
    },
    {
        value: "supplierID",
        label: "supplierID",
        text: "supplierID",
    }
    ]
    $scope.type = $scope.items[0];
            $scope.selectType = function() {
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
