(function(){ angular.module('app.signinCtrl', [])
.controller('SigninCtrl', function($scope, $state, Signin, $ionicHistory) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        
        //Check if previously checked in
        var loggedIn = window.localStorage['loggedIn'] || 'false';
        var user = JSON.parse(window.localStorage['user'] || '{}');
    
        if(loggedIn == 'true'){
            if(typeof user.username != 'undefined' && typeof user.password != 'undefined')
            {
                //Previously checked in, goes direct to home and picks up new authToken via login()
                //alert("Previously checked in")
                //$state.go('menu.home');
                
                //Something wrong, $state.go('menu.home')
                Signin.login(user.username, user.password);   
            }
        }
    });
    
    //For backbutton
    $scope.$on('$ionicView.enter', function(){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    })
    //If NOT previously checked in
    $scope.signIn = function(user){
        Signin.login(user.name, user.password); 
    }
    
    //Event fires when the login has failed   
    $scope.$on('event:auth-login-failed', function(e, status) {  
        alert('SigninCtrl: login failed!');
        $state.go('signin')
    });
    
    //Event fires when the login is confirmed
    $scope.$on('event:auth-loginConfirmed', function() {
        if($state.is('signin'))
            $state.go('menu.home');
    });
    
    //Event fires when server returns http 401 (unAuthenticated), tries to login the user again
    $scope.$on('event:auth-loginRequired', function(e, rejection) {
        var user = JSON.parse(window.localStorage['user'] || '{}');
        Signin.login(user.username, user.password);
  })
})
}())