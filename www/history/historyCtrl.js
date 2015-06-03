(function(){angular.module('app.historyCtrl', ['app.translate'])
.controller('HistoryCtrl', function($scope, $filter, $translate, history) {
    
    $scope.history = history;
    $scope.date = new Date().toJSON().slice(0,10);                             
    $scope.items =  
        [{
            value: "",
            label: "---"
        }]
    for(var x in history[0]){
        if(!(x === "pallets" || x == "$$hashKey"))
            $scope.items.push({value: x, label: x});
    }
    $scope.type = $scope.items[0];
    
})
}())
