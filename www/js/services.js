(function() {
    angular.module('app.services', [])
    

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

.factory('OrdersService', function(){
    
    /*var orderItems = [{ text: 'Order1', link: '11', status:'checked'},
                    { text: 'Order2', link: '12', status:'unchecked'},
                    { text: 'Order3', link: '13', status:'checked with errors'},
                    { text: 'Order4', link: '14', status:'partially checked'} ];
    
    var pallets = { orderDate: '2015-03-12', quantity: '4', weight:'80'};*/
        
        var orderItems = function(){
            var db = new Dexie("localSIM");

            db.open().then(
                function(success){
                console.log("Sucess outer:"+success);
                db.order.toArray(function(result) {
                            console.log(JSON.stringify(result))
                });         
                },
                function(fail){
                    console.log("Fail:"+fail);
                })
        };
        
    
    // Request DB for name of id
    getName = function(id){
        return 'DESCRIPTION';
    }
    
    return {
        items : function() {
            return orderItems();
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
.factory('HomeService', function($q){
       
        
        var dispatchNotes = function() {
            var deferred = $q.defer();
            
            var db = new Dexie("localSIM");

            db.open().then(
                function(success){
                console.log("Sucess outer:"+success);
                db.dispatchNotes.each(function(friend) {
                    console.log(JSON.stringify(friend));
    });         },
                function(fail){
                    console.log("Fail:"+fail);
                    var db = new Dexie("localSIM");
                    db.version(1).stores({ dispatchNotes: "id", order: "[did+id],did,id"});
                    db.open().then(
                        function(success){console.log("Sucess inner:"+success);
        console.log("before add");
        db.dispatchNotes.add({id: "N104", description: "CJ-TUBE-0140", date: "P4/2/2015"});
        db.dispatchNotes.add({id: "N105", description: "CJ-TUBE-0141", date: "P4/2/2015"});
        db.dispatchNotes.add({id: "N106", description: "CJ-TUBE-0142", date: "P4/2/2015"});
        db.dispatchNotes.add({id: "N107", description: "CJ-TUBE-0143", date: "P4/2/2015"})
        db.order.add({did:"N104", id:"AK029250", quantity: "5", weight: "30"});
        db.order.add({did:"N104", id:"AK028890", quantity: "10", weight: "300"})
        .then(function(){                            db.dispatchNotes.toArray(function(result) {
                            console.log(JSON.stringify(result));
                            deferred.resolve({'error':false,'result':result});
                            }); 
                         db.order.toArray(function(result) {
                            console.log(JSON.stringify(result))});
                        },function(fail){console.log("Fail:"+fail)});})
 
})
        db.close();
        return deferred.promise;        
            }
    /*var dispatchNotes =
        [{ text: 'Dispatch note 1', link: '1'},
         { text: 'Dispatch note 2', link: '2'},
         { text: 'Dispatch note 3', link: '3'}];*/
    
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
        dispatchNotes : dispatchNotes
        }
        /*getConnection: function() {
            var networkState = navigator.connection.type;
            return states[networkState];
        }*/
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
.factory('SigninService', ['MenuService', function(MenuService,$window){
    
    return function(name, password) {
        var login;
        //if(name =='name' && password =='pw'){
            login = true;
            MenuService.userName = name;
        //}
        //else {
        //    login = false;
        //}
        return login;
            
    }
}]);
           }());
