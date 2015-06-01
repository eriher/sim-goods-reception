(function(){angular.module('app.historyCtrl', ['app.translate'])
.controller('HistoryCtrl', function($scope, $filter, $translate, history) {
    
    $scope.history = history;
                                 
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
    
})
}())
