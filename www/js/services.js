(function() {
    angular.module('app.services', [])
    
// Intercepts 401 https statuses
.factory('AuthInterceptor', function ($rootScope, $q) {
  return {
    responseError: function (response) {
        if (response.status === 401){
            $rootScope.$broadcast({401: 'event:auth-loginRequired',}[response.status], response);
              return $q.reject(response);
        }
        return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

.factory('MenuService', function(){
    var userName = "";
    var menuItems =
        [{ text: 'MENU_HOME', iconClass: 'icon ion-home', link: 'menu.home'},
         { text: 'MENU_HISTORY',iconClass: 'icon ion-filing', link: 'menu.history'},
         { text: 'MENU_HELP', iconClass: 'icon ion-help-circled',  link: 'menu.help'},
         { text: 'MENU_ABOUT',iconClass: 'icon ion-information-circled', link: 'menu.about'},
         { text: 'MENU_SIGN_OUT', iconClass:  'icon ion-log-out', link: 'signin'}
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
                function (success) {
                    deferred.resolve(success);
                }, 
                function (fail) {
                    deferred.reject(fail.toString());
                }
            );
        }
        catch (exc) {
            deferred.reject({'error':true, 'result': 'exception: ' + exc.toString()});
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
            $window.plugins.toast.showLongTop(message, 
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
.factory('SigninService',  function(MenuService, $http, NetworkService, $rootScope){
    
    var LOCAL_TOKEN_KEY = 'token';
    var isAuthenticated = false;
    var authToken;
    var user;
    
    var login = function(name, password){
            NetworkService.login(name, password).then(function(data){
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
.factory('NetworkService', function($http, $q, ToastService){
        
        var dbTestData = function(){
            var deferred = $q.defer();
            $http.get('https://database').success(function(success){
                console.log("dbtestdata success")
                deferred.resolve(success.db);
            })
            .error(function(data, status, headers, config){
                ToastService.toast('dbTestData failed, HTTP-status: '+status)
                deferred.reject("error");
            })
            return deferred.promise;
        }
        var dbPost = function() {
            $http.post('https://database', {id:"S376", status: "checked"}).success(function(success){
                console.log("postsuccess")
            })
            .error(function(data, status, headers, config){
                ToastService.toast('dbPost failed, HTTP-status: '+status)
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
                ToastService.toast('dbTestData2 failed, HTTP-status: '+status)
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
                ToastService.toast('Login failed, HTTP-status: '+status)
                alert('NetworkService: test toast')
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
.factory('DataStorage', function($q, NetworkService, ToastService){
        var data;
        var updateLocalStorage = function() {
        window.localStorage['data'] = JSON.stringify(data);
        }

        
    var getData = function() {
        return data;
    }
    var getCount = function(id) {
        var pallets = getPallets(id);
        var count = 0;
                for(var pallet in pallets){
                    if (pallets[pallet].status != "unchecked"){
                        count++;
                    }      
                }
        return [count,pallets.length];
    }
    var checkDispatchStatus = function(id) {
        var count =  getCount(id);
        if(count[0]==count[1])
        {
            for(dispatch in data.dispatchrows)
                if(data.dispatchrows[dispatch].id == id)
                {
                    data.dispatchrows[dispatch].status = "checked";
                    ToastService.toast("Dispatch:"+id+" marked as checked");
                }
        }
    }
    var getDispatchesCount = function(){
            var pallets = [];
            for(var dispatch in data.dispatchrows)
            {
                pallets.push(getCount(data.dispatchrows[dispatch].id))
            }
        console.log(pallets[0])
            return pallets;
    }
    var getPallets = function(id) {
        var pallets= [];
        for(i in data.palletrows)
            if(data.palletrows[i].did == id)
                pallets.push(data.palletrows[i])
        return pallets;
    }
    var palletExist = function(id) {
        var pallets = data.palletrows
        for(pallet in pallets)
            if(pallets[pallet].id == id)
                return [id,pallets[pallet].did]
        return null
    }
    var dispatchExist = function(id) {
        var dispatches = data.dispatchrows
        for(dispatch in dispatches)
            if(dispatches[dispatch].id == id)
                return id
        return null
    }
    var sync = function() {
        var deferred = $q.defer();
    if(!localStorage.getItem['uncommited'])
        NetworkService.dbTestData().then(function(success){
            deferred.resolve();
            console.log("data storage success"+success.dispatchrows);
            data = success;
            updateLocalStorage();
        },function(fail){
            deferred.reject();
            console.log("server responded some error");
        })
    else
        NetworkService.dbTestData2.then(function(success){
            data = success;
            localStorage.setItem['uncommited'] = 'true';
            updateLocalStorage();
            deferred.resolve();
        },function(fail){
            data = localStorage.getItem['localsim'];
            deferred.reject();
        })
        return deferred.promise
        }
    return {
        getData : function(){
            return getData();
        },
        sync : function(){
            return sync();
        },
        getPallets : function(id) {
            return getPallets(id);
        },
        getCount: function(id){
            return getCount(id);
        },
        getDispatchesCount: function(){
            return getDispatchesCount();
        },
        checkDispatchStatus: function(id){
            return checkDispatchStatus(id);
        },
        palletExist: function(id){
            return palletExist(id);
        },
        dispatchExist: function(id){
            return dispatchExist(id);
        }
    }
    
})
.factory('DBService', function($q, ToastService, NetworkService, $rootScope){
        
        
        var db = new localStorageDB("LocalSIM", localStorage);
        
        console.log("dbtestdata success");
        if(db.isNew()){
            console.log("DB is new");
        NetworkService.dbTestData().then(function(success){
           
            console.log("dbtestdata success"+success.dispatchrows);
            var dispatchrows = success.dispatchrows;
            var palletrows = success.palletrows;
            db.createTableWithData("dispatch", dispatchrows);
            db.createTableWithData("pallet", palletrows);
            db.commit();
           
            $rootScope.$broadcast('dbupdated', { any: {} });
        },function(fail){
            console.log("dbtestdata fail");
        });
        }
        var refreshDB = function(){
            NetworkService.dbSync().then(function(success){
                console.log("refreshing db");
                var dispatchrows = success.dispatchrows;
                var palletrows = success.palletrows;
                console.log(dispatchrows)
                for(i in dispatchrows)
                    db.insertOrUpdate("dispatch",{id: dispatchrows[i].id}, dispatchrows[i])
                for(i in palletrows)
                    db.insertOrUpdate("pallet", {id: palletrows[i].id}, palletrows[i])
                db.commit();
                $rootScope.$broadcast('dbupdated', { any: {} });
            })
        }
        var getDispatches = function(){
            var deferred = $q.defer();
            var result = db.queryAll("dispatch");
            console.log(result.length);
            if(result.length > 0)
                deferred.resolve(result);
            else
                deferred.reject("no local dispatches found")
            return deferred.promise;
            };
        
        var getPallets = function(id){
            var deferred = $q.defer();
            var result = db.queryAll("pallet", {
                query:{did: id}});
            if(result.length>0)
                deferred.resolve(result);
            else
                deferred.reject("no pallets found");         
            return deferred.promise;
        }
        var getPallet = function (id){
            var deferred = $q.defer();
            deferred.resolve(db.queryAll("pallet", {
                query:{pid: id}}));
            return deferred.promise;
        }
        var scanDispatch =  function(id){
            var deferred = $q.defer();
            console.log("in scandispatch: "+id)
            var result = db.queryAll("dispatch",{
                    query:{id:id}});
            console.log(result[0]);
            if(result.length)
                deferred.resolve({'dispatchId': result[0].id});
            else
                deferred.reject("Dispatch not found")
            return deferred.promise;
        }
        var scanPallet = function(id){
            alert("in scan pallet");
            var deferred = $q.defer();
            var result = db.queryAll("pallet", {
                query:{id: id}});
            alert(result);
            if(result.length>0)
                deferred.resolve({'dispatchId':result[0].did,'palletId':result[0].id});
            else
                deferred.reject("Pallet not found")
            return deferred.promise;
        }
        var scanOrder = function(id){
            alert("in scan order");
            var deferred = $q.defer();
            var result = db.queryAll("pallet", {
                query:{order: id}});
            alert(result);
            if(result.length>0)
                deferred.resolve({'dispatchId':result[0].did,'palletId':result[0].id});
            else
                deferred.reject("Order not found")
            return deferred.promise;
        }
        var setStatus = function(table,item,status){
            console.log(table,item.id)
            db.update(table,{id: item.id},
                     function(row){
                row.status = status;
                return row;
            })
            //emulate trigger
            if(table == "pallet")
            {
                console.log("table is a pallet")
                var count = countCheckedPallet(item.did);
                if(count[0]==count[1]){
                    console.log("count==pallets.length")
                    var item2 = {id: item.did}
                    setStatus("dispatch", item2,"checked");
                    ToastService.toast("Dispatch: "+item.did+" marked as checked").then(function(success){console.log("toast success")},function(fail){console.log("toast fail")});
                }
            }
        }
        var countCheckedPallet = function(id){
            var pallets = db.queryAll("pallet",{query:{did:id}});
                //console.log(pallets[0].status);
                var count = 0;
                for(var pallet in pallets){
                    console.log("inside pallets");
                    if (pallets[pallet].status != "unchecked"){
                        count++;
                    }      
                }
            return [count,pallets.length];
        }
        var dispatchesForPallets = function(dispatches){
            var pallets = [];
            for(var dispatch in dispatches)
            {
                pallets.push(countCheckedPallet(dispatches[dispatch].id))
                console.log(pallets)
            }
            return pallets;
        }
        
        
         return {
             getDispatches: function() {
                 return getDispatches();
            },
             getPallets: function(id){
                 return getPallets(id);
            },
             getPallet: function(id){
                 return getPallet(id);
             },
             scanDispatch: function(id){
                 return scanDispatch(id);
            },   
             scanPallet: function(id){
                 return scanPallet(id);
            },
             setStatus: function(table,item,status){
                 return setStatus(table,item,status);
             },
             countCheckedPallet: function(id){
                 return countCheckedPallet(id);
             },
             dispatchesForPallets: function(dispatches){
                 return dispatchesForPallets(dispatches);
             },
             refreshDB: function(){
                 return refreshDB();
             }
         }
        
    })
}());