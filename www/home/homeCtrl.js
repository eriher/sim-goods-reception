(function(){angular.module('app.homeCtrl', ['app.translate'])
.controller('HomeCtrl', function($scope, $state, DataStorage, $filter, $translate, data, counts) {
    
    $scope.$on('$ionicView.enter', function(){
      $scope.counts =  counts();
    })
    var init = 2;
    $scope.dispatches = data.dispatchrows.slice(0,init+1);
    
    $scope.moreDataCanBeLoaded = function(){
        return (init<data.dispatchrows.length-1)
    }
    $scope.loadMore = function(){
        if($scope.moreDataCanBeLoaded()){
            init = init + 1;
            $scope.dispatches.push(data.dispatchrows[init]);
        }
        if($scope.moreDataCanBeLoaded()){
            init = init + 1;
            $scope.dispatches.push(data.dispatchrows[init]);
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    
    $scope.goTo = function(id) { 
        $state.go('menu.pallets', {dispatchId : id});
    };
                                        
    //Sets date every minute
    var months = ['JANUARY', 'FEBUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    showDate();
    setInterval(showDate, 60000);
    function showDate(){
        var date = new Date();
        var day = date.getUTCDate();
        var month = date.getUTCMonth();
        var year = date.getUTCFullYear();
        //$scope.today = day+'/'+(month+1)+'-'+year;
        
        if($translate.use() == 'en-US')
            $scope.today = $filter('translate') (months[month]) + ' ' + day +', '+year;
        else
            $scope.today = day +' ' + $filter('translate')(months[month]) +  ', '+year;
        $scope.$apply();
    }
    
    $scope.goTo = function(id) { 
        $state.go('menu.pallets', {dispatchId : id });
    }                              

    $scope.refresh= function(){
        DataStorage.sync();
        $scope.$broadcast('scroll.refreshComplete');
    };
})
}())
