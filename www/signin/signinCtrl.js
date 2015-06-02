(function(){ angular.module('app.signinCtrl', [])
.controller('SigninCtrl', function($scope, $state, Signin, $ionicHistory, $ionicLoading, $ionicViewSwitcher) {
    
    $scope.me = 5;
    $scope.errror = false;
    
    $scope.signIn = function(name, password){
        if(name.length<4 || password.length<4){
            $scope.error = true;
        }
        else{
            $scope.error = false;
            $ionicLoading.show({
            template: '<p class="item-icon-left">Loading... <ion-spinner icon="spiral"/></p>'
            })
            Signin.login(name,password);  
        }
    }
    
    //Event fires when the login has failed   
    $scope.$on('event:auth-login-failed', function(e, status) {
        console.log("login failed");
        alert('Login failed!')
        $ionicLoading.hide()
        $state.go('signin')
    });
    
    //Event fires when the login is confirmed
    $scope.$on('event:auth-loginConfirmed', function() {
        console.log("login confirmed");
        if($state.is('signin')){
            $ionicViewSwitcher.nextDirection("forward"); 
            $state.go('menu.home');
        }
            
    });
    
    //Event fires when server returns http 401 (unAuthenticated), tries to login the user again
    $scope.$on('event:auth-loginRequired', function(e, rejection) {
        var user = JSON.parse(window.localStorage['user'] || '{}');
        Signin.login(user.username, user.password);
  })

})
}())