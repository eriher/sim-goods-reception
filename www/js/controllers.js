(function(){angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state, MenuService, ScanService, ToastService, $ionicHistory, $location, DBService) {
    
    $scope.menuItems = MenuService.items();
    
    $scope.userName = MenuService.userName;
    
    $scope.back = function() {
        var url = $location.path();
        url = url.slice(0,url.lastIndexOf('/'));
        if(url == '/menu/home'){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
                });
        }
        else{
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
            });
        }
            
            $location.path(url).replace();
        }
    
    $scope.menuClick = function(dest){
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate : true
        }); 
        $state.go(dest);
    }
    
    $scope.scanBtn = function(){
        ScanService.scan().then(
            function(result){
            //scan not cancelled by 
            if(!result.cancelled){
                var scanId = result.text;
                switch(scanId.charCodeAt(0)) {
                        case 78 :
                        
                            $state.go('menu.orders', {dispatchId : scanId });
                            break;
                        case 65 :
                            $state.go('menu.order', {dispatchId : 5, orderId : scanId});
                            break;
                        case 83 :
                            $state.go('menu.pallet',{palletId : scanId});
                            break;
                };}
                else{
                alert("Scan cancelled");
                }}
                ,function(reject){console.log("Scan failed:"+fail)})
    }
})

.controller('OrderCtrl', function($scope, $stateParams, $ionicHistory) {
    $scope.navTitle= 'Order Id: '+$stateParams.orderId;
    $scope.id = $stateParams.orderId;
})

.controller('OrdersCtrl', function($scope, $stateParams, OrdersService, $state) {
    var id = $stateParams.dispatchId;
    
    $scope.navTitle= 'Dispatch Id: '+id;
    
    $scope.message = OrdersService.name(id);
    
    $scope.orderItems = OrdersService.items(id).then(
        function(success){console.log("orderservice success:"+JSON.stringify(success));
                          $scope.orderItems = success},
        function(fail){console.log("orderservice fail:"+fail)});;
    
    $scope.goTo = function(id2) {
        $state.go('menu.order', {dispatchId: id, orderId : id2 });
    }
    
})

.controller('HomeCtrl', function($scope, HomeService, $state, $location,DBService) {
    $scope.navTitle = 'Home';
    
    $scope.dispatchNotes =  HomeService.dispatchNotes().then(
        function(success){console.log("homeservice success:"+JSON.stringify(success));
                          $scope.dispatchNotes = success},
        function(fail){console.log("homeservice fail:"+fail)});
    
    $scope.goTo = function(id) {
        $state.go('menu.orders', {dispatchId : id });
    }
                                     

    $scope.refresh= function(){
        $scope.dispatchNotes = HomeService.test();
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('AboutCtrl', function($scope) {
    $scope.navTitle = 'About';
})

.controller('HistoryCtrl', function($scope) {
    $scope.navTitle = 'History';
})

.controller('SigninCtrl', function($scope, $state, SigninService, $ionicHistory) {
    $scope.formData = {};
    $scope.$on('$ionicView.beforeEnter', function(){
        $ionicHistory.clearHistory();
    });
    $scope.$on('$ionicView.leave', function(){
        $ionicHistory.clearHistory();
    });

    $scope.signIn = function(user){
        if(SigninService.login(user.Name, user.Password))
        {  
            $state.go('menu.home');
        }
        else
        {
            alert('Username/password was incorrect!');
        }
    };
    
    $scope.test = function(){
        
        $scope.testa = SigninService.loginTest();
    }
        
});
}());
