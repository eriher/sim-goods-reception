angular.module('app.services', [])

.factory('MenuService', function(){
    
    var menuItems =
        [{ text: 'Orders', iconClass: 'icon ion-map', link: 'orders'},
         { text: 'History',iconClass: 'icon ion-map', link: 'history'},
         { text: 'About',iconClass: 'icon ion-map', link: 'about'}];
    
    return {
        all: function() {
            return menuItems;
        }
    }
})

// For testing purposes
.factory('OrdersService', function(){
    
    var orderItems =
        [{ text: 'Test1', link: '1'},
         { text: 'Test2', link: '2'},
         { text: 'Test3', link: '3'}];
    
    // For testing refresh
    var test =
        [{ text: 'Updated 1', link: '1'},
         { text: 'Updated 2', link: '2'}];
    
    // For connection
    var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
    
    return {
        all: function() {
            return orderItems;
        },
        test: function() {
            return test;
        },
        getConnection: function() {
            var networkState = navigator.connection.type;
            return states[networkState];
        }
    }
})

.factory('ScanService', function($q){
        
        var scan = function(){

        var deferred = $q.defer();
        try {
            cordova.plugins.barcodeScanner.scan(
                function (result) {  // success
                    deferred.resolve({'error':false, 'result': result});
                }, 
                function (error) {  // failure
                    deferred.resolve({'error':true, 'result': error.toString()});
                }
            );
        }
        catch (exc) {
            deferred.resolve({'error':true, 'result': 'exception: ' + exc.toString()});
        }
        return deferred.promise;
        }
    return{
        scan : scan
    }

})
.factory('SigninService', function($window){
    
    return function(name, password) {
        var login;
        if(name =='name' && password =='pw'){
            login = true;
        }
        else {
            login = false;
        }
        return login;
            
    }
});
