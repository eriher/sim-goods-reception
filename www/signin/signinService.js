(function() {
    angular.module('app.signinService', [])
    
.factory('Signin',  ["$http", "Network", "$rootScope", "$q", "DataStorage", function($http, Network, $rootScope, $q, DataStorage){
    
    var LOCAL_TOKEN_KEY = 'token';
    var isAuthenticated = false;
    var authToken;
    var user;
    var item =5;
    
    var login = function(name, password){
        var deferred = $q.defer();
        Network.login(name, password).then(function(data){
            console.log('login success')
            user =  { username: name, password: password};

            //For Intel Security API
            //Comment for tests
            try {
                intel.security.secureStorage.write(
                function(){ 
                    console.log('Intel API write: succesful login');
                },
                function(errorObj){
                    console.log('Intel API write: fail code = '+errorObj.code+', message = '+errorObj.message);
                },
                {'id':'1', 'data': JSON.stringify(user)}
            ); 
            } catch (error) {
                window.localStorage.setItem("user", JSON.stringify(user));
            }
            
            console.log("before storetoken:"+data[0].Token);
            authToken = data[0].Token;
            storeToken(authToken)
            window.localStorage.setItem("customerIDS", JSON.stringify(data[0].CustomerID));
            // Sets the token as header for all requests
            $http.defaults.headers.common.Authorization = authToken;
            $rootScope.$broadcast('event:auth-loginConfirmed', status);

            deferred.resolve(data);

            },function(fail){
                console.log("login fail"+fail);
                $rootScope.$broadcast('event:auth-login-failed', status);
                deferred.reject(fail);
            });
            return deferred.promise;
    }
    
    var storeToken = function(authToken){
        window.localStorage.setItem(LOCAL_TOKEN_KEY, authToken);
        isAuthenticated = true;
        window.localStorage['loggedIn'] = 'true';
    }
        
    var logout = function(){
    
        //For Intel Security API 
        //Comment for tests
        try {
            intel.security.secureStorage.delete(    
            function(){console.log('Intel API delete: success');},
            function(errorObj){console.log('Intel API delete: fail code = '+errorObj.code+', message = '+errorObj.message);},
            {'id':'1'} 
        );
        } catch (error) {
            
        }

        //
        DataStorage.clearData();
        authToken = undefined;
        isAuthenticated = false;
        window.localStorage.clear();
    }
    
    return{
        storeToken: function(token){
            return storeToken(token);
        },
        login: function(name, password){
            return login(name, password);
        },
        logout: function(){
            return logout()
        },
        isAuthenticated: function(){
            return isAuthenticated;
        },
        user: function(){
            return user;
        }
    }      
}])
}())