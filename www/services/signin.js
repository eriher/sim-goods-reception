(function() {
    angular.module('app.services.signin', [])
    
.factory('Signin',  function(Menu, $http, Network, $rootScope){
    
    var LOCAL_TOKEN_KEY = 'token';
    var isAuthenticated = false;
    var authToken;
    var user;
    
    var login = function(name, password){
            Network.login(name, password).then(function(data){
            console.log('login success')
            //if the user data is correct, set it in localStorage(for now)
            user =  { username: name, password: password};
            window.localStorage['user'] = JSON.stringify(user);
            authToken = data.authorizationToken;

            storeToken(authToken)
            // Sets the token as header for all requests
            $http.defaults.headers.common.Authorization = authToken;
            $rootScope.$broadcast('event:auth-loginConfirmed', status); 
        
        },function(fail){
            console.log("login fail");
            $rootScope.$broadcast('event:auth-login-failed', status);
        });
    }
    
    var storeToken = function(authToken){
        window.localStorage.setItem(LOCAL_TOKEN_KEY, authToken);
        isAuthenticated = true;
        window.localStorage['loggedIn'] = 'true';
    }
        
    var logout = function(){
        authToken = undefined;
        isAuthenticated = false;
        window.localStorage.clear();
        delete $http.defaults.headers.common.Authorization;
    }
    
    return{
        login: function(name, password){
            return login(name, password);
        },
        logout: function(){
            return logout()
        },
        isAuthenticated: function(){
            return isAuthenticated;
        }
    }      
})
}())