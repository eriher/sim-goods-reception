(function(){angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state, MenuService, ScanService, ToastService, $ionicHistory, $location, DBService, SigninService) {
    
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
        if(dest == 'signin')
        {
            SigninService.logout();
        }
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
                            $state.go('menu.pallets', {dispatchId : scanId });
                            break;
                        case 65 :
                            $state.go('menu.pallet', {dispatchId : 5, palletId : scanId});
                            break;
                        case 83 :
                            $state.go('menu.pallet',{palletId : scanId});
                            break;
                }}
                else{
                alert("Scan cancelled");
                }}
                ,function(reject){console.log("Scan failed:"+fail)})
    }
})

.controller('PalletCtrl', function($scope, $stateParams, $ionicHistory) {
    $scope.navTitle= 'Pallet nr: '+$stateParams.palletId;
    $scope.id = $stateParams.palletId;
})

.controller('PalletsCtrl', function($scope, $stateParams, $state, DBService) {
    var id = $stateParams.dispatchId;
    
    $scope.navTitle= 'Dispatch Id: '+id;
    
    $scope.message = id;
    
    $scope.pallets = DBService.getPallets(id).then(
        function(success){console.log("palletsctrl success:"+JSON.stringify(success));
                          $scope.pallets = success},
        function(fail){console.log("palletsctrl fail:"+fail)});
    
    $scope.goTo = function(id2) {
        $state.go('menu.pallet', {dispatchId: id, palletId : id2 });
    }
    
})

.controller('HomeCtrl', function($scope, $state, $location,DBService) {
    $scope.navTitle = 'Home';
    
    $scope.dispatchNotes =  DBService.getDispatches().then(
        function(success){console.log("homeservice success:"+JSON.stringify(success));
                          $scope.dispatchNotes = success},
        function(fail){console.log("homeservice fail:"+fail)});
    
    $scope.goTo = function(id) {
        $state.go('menu.pallets', {dispatchId : id });
    }
                                     

    $scope.refresh= function(){
        $scope.dispatchNotes = HomeService.test();
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('AboutCtrl', function($scope) {
    $scope.navTitle = 'About';
})

.controller('HistoryCtrl', function($scope, $http) {
    $scope.navTitle = 'History';
    
    $scope.test = function(){
        $http.get('https://test')
        .success(function(data){
            console.log('testSuccess');
            alert(data.test);
        })
        .error(function(data, status, headers, config){
            console.log('testError');
        })
    }
})

.controller('SigninCtrl', function($scope, $state, SigninService, $ionicHistory) {

    $scope.signIn = function(user){
        SigninService.login(user.name, user.password);  
    }
    
    $scope.$on('$ionicView.beforeEnter', function () {
        //For navigation, clearHistory
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        
        //Check if previously checked in
        var loggedIn = window.localStorage['loggedIn'] || false;
        var user = JSON.parse(window.localStorage['user'] || '{}');
    
        if(loggedIn == 'true'){
            
            if(typeof user.username != 'undefined' && typeof user.password != 'undefined')
            {
                //Previously checked in, goes direct to home and picks up new authToken via loginTest
                $state.go('menu.home');
                SigninService.login(user.username, user.password);
            }
            
        }
    });
    
    $scope.$on('$ionicView.leave', function(){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    });

    //Event fires when the login is confirmed
    $scope.$on('event:auth-loginConfirmed', function() {
        $state.go('menu.home');
    });
    
    //Event fires when username and pw are not found by server
    $scope.$on('event:auth-login-failed', function(e, status) {  

        var error = "Login failed.";
        if (status == 400) {
          error = "Invalid Username or Password.";
        }
        alert(error);
        });
    
    //Event fires when server returns http 401 (unAuthenticated), login the user
    $scope.$on('event:auth-loginRequired', function(e, rejection) {
        var user = JSON.parse(window.localStorage['user'] || '{}');
        SigninService.login(user.username, user.password);
  });
});
}());
