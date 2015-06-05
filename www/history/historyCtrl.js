(function(){angular.module('app.historyCtrl', ['app.translate'])
.controller('HistoryCtrl', ["$scope", "$filter", "$translate", "history", function($scope, $filter, $translate, history) {
    
    $scope.history = history;
    $scope.date = new Date().toJSON().slice(0,10);                             
    $scope.items =  
    [{
        value: "",
        label: "---",
        text: "---",
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
