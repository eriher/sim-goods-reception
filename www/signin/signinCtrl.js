/*
    Controller for sigin module
    Contains functionality to login the user.
*/
(function(){ angular.module('app.signinCtrl', [])
.controller('SigninCtrl', ["$scope", "$state", "Signin", "$ionicLoading", "$ionicViewSwitcher", function($scope, $state, Signin, $ionicLoading, $ionicViewSwitcher) {

    $scope.errror = false;
    
    /* 
        Login function
        @param string name
        @param string password
    */
    $scope.signIn = function(name, password){

            $ionicLoading.show({
            template: '<p class="item-icon-left">Loading... <ion-spinner icon="spiral"/></p>'
            })
            Signin.login(name,password);
        
    }

    //Event fires when the login has failed   
    $scope.$on('event:auth-login-failed', function(e, status) {
        console.log("login failed");
        alert('Login failed!')
        $ionicLoading.hide()
        $scope.error = true;
    });
    
    //Event fires when the login is confirmed
    $scope.$on('event:auth-loginConfirmed', function() {
        console.log("login confirmed");
        if($state.is('signin')){
            $ionicLoading.hide()
            $ionicViewSwitcher.nextDirection("forward"); 
            $state.go('menu.home');
        }
            
    });

}])
}())