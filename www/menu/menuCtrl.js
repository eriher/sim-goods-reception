/*
    Controller for Menu module.
    Contains funtionality for sidemenu.
*/
(function(){ angular.module('app.menuCtrl', [])
.controller('MenuCtrl', ["$scope", "$state", "Scan", "$ionicHistory", "Signin", "$ionicViewSwitcher", "DataStorage", "$ionicPopup", function($scope, $state, Scan, $ionicHistory, Signin, $ionicViewSwitcher, DataStorage, $ionicPopup) {
    $scope.me = 5;
    $scope.menuItems = 
        [{ text: 'MENU_HOME', iconClass: 'icon ion-home', link: 'menu.home'},
         { text: 'MENU_HISTORY',iconClass: 'icon ion-filing', link: 'menu.history'},
         { text: 'MENU_HELP', iconClass: 'icon ion-help-circled',  link: 'menu.help'},
         { text: 'MENU_ABOUT',iconClass: 'icon ion-information-circled', link: 'menu.about'},
         { text: 'MENU_SIGN_OUT', iconClass:  'icon ion-log-out', link: 'signin'}
        ];
    // Kommentera bort userName för testning
   DataStorage.getUserInfo().then(function(success){
        $scope.userName = success.username;
    },
    function(err){
       console.log('error retriving username in menuCtrl');
   });
    
    $scope.back = function() {
            $ionicHistory.nextViewOptions({
                //disableAnimate: true,
                disableBack: true
                });
            $state.go('menu.home')
        }
    
    $scope.menuClick = function(dest){
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate : true
        });
        if(dest == 'signin'){
            if(window.localStorage['syncData']){
                var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Unsyced data will be deleted, are you sure you want to logout?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        Signin.logout();
                        $ionicViewSwitcher.nextDirection("back"); 
                        $state.go(dest);
                    } 
                });
            }
            else{
                Signin.logout();
                $ionicViewSwitcher.nextDirection("back"); 
                $state.go(dest);   
            }
        }
        else{
            $state.go(dest);
        }
        
    }
    
    $scope.scanBtn = function(){
        Scan.scan()
    }
}])
}())