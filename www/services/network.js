(function() {
    angular.module('app.services.network', [])

.factory('Network', function($http, $q, Toast){
        
        var dbTestData = function(){
            var deferred = $q.defer();
            $http.get('https://database').success(function(success){
                console.log("dbtestdata success")
                deferred.resolve(success.db);
            })
            .error(function(data, status, headers, config){
                Toast.toast('dbTestData failed, HTTP-status: '+status)
                deferred.reject("error");
            })
            return deferred.promise;
        }
        var dbPost = function() {
            $http.post('https://database', {id:"S376", status: "checked"}).success(function(success){
                console.log("postsuccess")
            })
            .error(function(data, status, headers, config){
                Toast.toast('dbPost failed, HTTP-status: '+status)
                console.log("postfail")
            })
    }
        var dbSync = function() {
            console.log("sync");
            var deferred = $q.defer();
            dbPost();
            return dbTestData2();
            
        }
        var dbTestData2 = function(){
            var deferred = $q.defer();
            $http.get('https://database2', {data: window.localStorage['token']}).success(function(success){
                deferred.resolve(success.db);
            })
            .error(function(data, status, headers, config){
                Toast.toast('dbTestData2 failed, HTTP-status: '+status)
                deferred.reject("error");
            })
            return deferred.promise;
        }
        
        var login = function(name, password){
            var deferred = $q.defer();
            $http.post('https://login', {username : name , password: password})
            .success(function(success){

                deferred.resolve(success);
            })
            .error(function(data, status, headers, config){
                Toast.toast('Login failed, HTTP-status: '+status)
                alert('test toast')
                deferred.reject("error");
            }) 
            return deferred.promise;
        }
    
        
        return{
            dbTestData: function() {
                 return dbTestData();
            },
            dbTestData2: function() {
                return dbTestData2();
            },
            dbSync: function() {
            return dbSync();
            },
            login: function(name, password) {
                return login(name, password);
            }
        }
})
}())