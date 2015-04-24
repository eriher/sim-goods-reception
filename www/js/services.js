(function() {
    angular.module('app.services', ['http-auth-interceptor'])
    

.factory('MenuService', function(){
    var userName = "";
    var menuItems =
        [{ text: 'Home', iconClass: 'icon ion-home', link: 'menu.home'},
         { text: 'History',iconClass: 'icon ion-filing', link: 'menu.history'},
         { text: 'Help', iconClass: 'icon ion-help-circled',  link: 'menu.help'},
         { text: 'About',iconClass: 'icon ion-information-circled', link: 'menu.about'},
         { text: 'Sign out', iconClass:  'icon ion-log-out', link: 'signin'}
        ];
    
    return {
        items: function() {
            return menuItems;
        },
        userName: function(){
            return userName;
        }
    }
})

.factory('ScanService', function($q){
        
        var scan = function(){

        var deferred = $q.defer();
        try {
            cordova.plugins.barcodeScanner.scan(
                function (result) {  // success
                    deferred.resolve(result);
                }, 
                function (error) {  // failure
                    deferred.rejet(error.toString());
                }
            );
        }
        catch (exc) {
            deferred.rejet({'error':true, 'result': 'exception: ' + exc.toString()});
        }
        return deferred.promise;
        }
    return{
        scan : scan
    }

})
.factory('ToastService', function($q, $window){
        
        var toast = function(message){
            var deferred = $q.defer();
        try {
            $window.plugins.toast.showShortCenter(message, 
                function (result) {
                    deferred.resolve(result);
                }, 
                function (error) {  // failure
                    deferred.reject(error);
                });
        }
        catch (exc) {
            deferred.reject(exc)
            console.log("fail");
        }
            return deferred.promise;
        }
        
    return{
        toast : toast
    }

})
.factory('SigninService',  function(MenuService, $window, $http, authService,$rootScope){
    
    var login = function(name, password) {
        var login;
        if(name =='admin' && password =='admin'){
            login = true;
            MenuService.userName = name;
        }
        else {
            login = false;
        }
        return login;  
    }
    
    var loginTest = function(name, password){
        
        var access = false;
        $http.post('https://login', {username : name , password: password})
        .success(function(data){
            console.log('success');
            
            //if the user data is correct, set it in localStorage(for now)
            var user =  { username: name, password: password};
            window.localStorage['user'] = JSON.stringify(user);
            
            $http.defaults.headers.common.Authorization = data.authorizationToken;
            authService.loginConfirmed(data, function(config){
                config.headers.Authorization = data.authorizationToken;
                return config;
            });
                
            
        })
        .error(function(data, status, headers, config){
            $rootScope.$broadcast('event:auth-login-failed', status);
        })

    }
    
    var logout = function(){
        delete $http.defaults.headers.common.Authorization;
        $rootScope.$broadcast('event:auth-logout-complete');
    }
    
    return{
        login: function(name, password){
            return login(name, password);
        },
        loginTest: function(name, password){
            return loginTest(name, password);
        },
        logout: function(){
            return logout()
        }
    }
        
})

.factory('DBService', function($q){
                window.shimIndexedDB.__useShim();
                window.shimIndexedDB.__debug(true);
                var db = new Dexie("localSIM");
                db.version(1).stores({ dispatchNotes: "id", pallet: "id,did,[did+id],relation", article:"id,oid,[oid+id]relation"});
                //test data
                console.log("no database exists");
                db.on('ready', function () {
                    db.dispatchNotes.add({id: "N104", description: "CJ-TUBE-0140", date: "P4/2/2015", status:"incoming"});
                    db.dispatchNotes.add({id: "N105", description: "CJ-TUBE-0141", date: "P4/2/2015", status:"checked with errors"});
                    db.dispatchNotes.add({id: "N106", description: "CJ-TUBE-0142", date: "P4/2/2015", status:"partially checked"});
                    db.dispatchNotes.add({id: "N107", description: "CJ-TUBE-0143", date: "P4/2/2015", status:"checked"});
                    db.pallet.add({did:"N104", id:"AK029250", quantity: "5", weight: "30", status:"unchecked"});
                    db.pallet.add({did:"N104", id:"AK028890", quantity: "10", weight: "300", status:"unchecked"});
                    db.pallet.add({did:"N105", id:"AK029255", quantity: "1", weight: "320", status:"unchecked"});
                    db.pallet.add({did:"N105", id:"AK028896", quantity: "14", weight: "34", status:"unchecked"});
                    db.article.add({id:"376", oid:"AK029250"});
                    db.article.add({id:"377", oid:"AK028890"});
                });
                db.open();

        var getDispatches = function(){
        var deferred = $q.defer();
        db.dispatchNotes.toArray(function(result) {
                            console.log(JSON.stringify(result));
                            deferred.resolve(result);
                            }); 
        db.pallet.toArray(function(result) {
                            console.log(JSON.stringify(result))});                             
        return deferred.promise;
        };
        
        var getPallets = function(id){
            console.log("idtype:"+id);
            var deferred = $q.defer();
           db.pallet.where("did").equals(id).toArray(function(result) {
                            console.log(JSON.stringify(result));
                            deferred.resolve(result);
                            });                   
            return deferred.promise;
        }
        
        var getDispatch =  function(scanId){
            console.log("idtype:"+scanId);
            var deferred = $q.defer();
            db.dispatchNotes.get(scanId).then(function(result) {
                
                if(result){
                        alert(JSON.stringify(result));
                        deferred.resolve({'dispatchId':result.id});
                }
            
            });
            return deferred.promise;
        }
        var getPallet = function(scanId){
            var deferred = $q.defer();
            db.pallet.get(scanId).then(function(result) {
                console.log(result);
                        if(result){
                            alert(JSON.stringify(result));
                            deferred.resolve({'dispatchId':result.did,'palletId':result.id});
                         }
                         });
            
            return deferred.promise;
        }
        
        
         return {
             getDispatches: function() {
                 return getDispatches();
            },
             getPallets: function(id){
                 return getPallets(id);
         },
             getDispatch: function(id){
                 return getDispatch(id);
         },   
             getPallet: function(id){
                 return getPallet(id);
         }
         }
})
}());