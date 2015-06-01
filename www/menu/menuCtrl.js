(function(){ angular.module('app.menuCtrl', [])
.controller('MenuCtrl', function($scope, $state, Menu, Scan, $ionicHistory, Signin, $ionicViewSwitcher, DataStorage) {

    $scope.me = 5;
    $scope.menuItems = 
        [{ text: 'MENU_HOME', iconClass: 'icon ion-home', link: 'menu.home'},
         { text: 'MENU_HISTORY',iconClass: 'icon ion-filing', link: 'menu.history'},
         { text: 'MENU_HELP', iconClass: 'icon ion-help-circled',  link: 'menu.help'},
         { text: 'MENU_ABOUT',iconClass: 'icon ion-information-circled', link: 'menu.about'},
         { text: 'MENU_SIGN_OUT', iconClass:  'icon ion-log-out', link: 'signin'}
        ];
    // Kommentera bort userName för testning
    //$scope.userName = JSON.parse(window.localStorage['user']).username;
    
    $scope.back = function() {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
                });
 
            $state.go('menu.home')
        }
    
    $scope.menuClick = function(dest){
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate : true
        });
        if(dest == 'signin')
        {
            DataStorage.clearData();
            Signin.logout();
        }
        $state.go(dest);
    }
    
    $scope.scanBtn = function(){
        
               Scan.scan()
    }
})
}())