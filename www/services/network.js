(function() {
    angular.module('app.services.network', [])

.factory('Network', function($http, $q, Toast){
        
        var dbPost = function() {
            $http.post('https://database', {id:"S376", status: "checked"}).success(function(success){
                console.log("postsuccess")
            })
            .error(function(data, status, headers, config){
                Toast.toast('dbPost failed, HTTP-status: '+status)
                console.log("postfail")
            })
    }
        var dbTestData = function(){
            var customerIDS = JSON.parse(window.localStorage['customerIDS']);
            var promises = customerIDS.map(function(customerID) {
                return $http.get('http://sim.apper.se//wcf.sandbox/Test.svc/REST/Test/getDispatchInfo', {
                    params: {customerID: customerID, token: window.localStorage['token']}
                })
            });
            return $q.all(promises);
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
                Toast.toast('Login failed, HTTP-status: '+status)
                deferred.reject(status);
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