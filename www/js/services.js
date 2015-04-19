(function() {
    angular.module('app.services', [])
    

.factory('MenuService', function(){
    
    var menuItems =
        [{ text: 'Home', iconClass: 'icon ion-map', link: 'home'},
         { text: 'History',iconClass: 'icon ion-map', link: 'history'},
         { text: 'About',iconClass: 'icon ion-map', link: 'about'}];
    
    return {
        all: function() {
            return menuItems;
        }
    }
})

.factory('OrdersService', function(){
    
    var orderItems = [{ text: 'Order1', link: '11', status:'checked'},
                    { text: 'Order2', link: '12', status:'unchecked'},
                    { text: 'Order3', link: '13', status:'checked with errors'},
                    { text: 'Order4', link: '14', status:'partially checked'} ];
    
    var pallets = { orderDate: '2015-03-12', quantity: '4', weight:'80'};
    
    // Request DB for name of id
    getName = function(id){
        return 'DESCRIPTION';
    }
    
    return {
        items : function() {
            return orderItems;
        },
        name : function(id){
            return getName(id);
        },
        pallets: function(){
            return pallets;
        }
    }
})

// For testing purposes
.factory('HomeService', function(){
    
    var dispatchNotes =
        [{ text: 'Dispatch note 1', link: '1'},
         { text: 'Dispatch note 2', link: '2'},
         { text: 'Dispatch note 3', link: '3'}];
    
    // For testing refresh
    var test =
        [{ text: 'Updated 1', link: '1'},
         { text: 'Updated 2', link: '2'}];
    /*
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
    */
    return {
        all: function() {
            return dispatchNotes;
        },
        test: function() {
            return test;
        },
        /*getConnection: function() {
            var networkState = navigator.connection.type;
            return states[networkState];
        }*/
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
                    deferred.rejet({'error':true, 'result': error.toString()});
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
            var defer = $q.defer();
        try {
            $window.plugins.toast.showShortCenter(message, 
                function (result) {
                    defer.resolve(result);
                }, 
                function (error) {  // failure
                    defer.reject(error);
                });
        }
        catch (exc) {
            defer.reject(exc)
            console.log("fail");
        }
            return defer.promise;
        }
        
    return{
        toast : toast
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
           }());
