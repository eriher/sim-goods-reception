(function() {
    angular.module('app.services.network', [])

.factory('Network', function($http, $q, Toast){
        
        var dbTestData2 = function(){
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
            //var deferred = $q.defer();
            //dbPost();
            return dbTestData2();
            
        }
        var dbTestData = function(customerID){
            var deferred = $q.defer();
            $http.get('http://sim.apper.se//wcf.sandbox/Test.svc/REST/Test/getDispatchInfo', {
                params: {customerID: customerID, token: window.localStorage['token']}
            }).success(function(success){
                console.log(success);
                deferred.resolve(success);
            })
            .error(function(data, status, headers, config){
                Toast.toast('getDispatchInfo failed '+status)
                deferred.reject(status);
            })
            return deferred.promise;
        }
        
        var login = function(name, password){
            var deferred = $q.defer();
            $http.get('http://sim.apper.se/WCF.Sandbox/Test.svc/REST/Test/login', {
                params: {username : name , Password: password}
            })
            .success(function(success){
                console.log(success);
                if(success.length > 0)
                    deferred.resolve(success);
                else
                    deferred.reject("bad login");
            })
            .error(function(data, status, headers, config){
                deferred.reject(status);
            }) 
            return deferred.promise;
        }
    
        
        return{
            dbTestData: function(customerID) {
                 return dbTestData(customerID);
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