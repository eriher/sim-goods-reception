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

.factory('OrdersService', ['DBService', function(DBService){
    
    /*var orderItems = [{ text: 'Order1', link: '11', status:'checked'},
                    { text: 'Order2', link: '12', status:'unchecked'},
                    { text: 'Order3', link: '13', status:'checked with errors'},
                    { text: 'Order4', link: '14', status:'partially checked'} ];
    
    var pallets = { orderDate: '2015-03-12', quantity: '4', weight:'80'};*/
        
        var orderItems = function(id){
            return DBService.getOrders(id);
        };
        
    
    // Request DB for name of id
    var getName = function(id){
        return 'DESCRIPTION';
    }
    
    return {
        items : function(id) {
            return orderItems(id);
        },
        name : function(id){
            return getName(id);
        },
        pallets: function(){
            return pallets;
        }
    }
}])

// For testing purposes
.factory('HomeService', ['DBService', function(DBService){
       
        
        var dispatchNotes = function() {
            return DBService.getDispatchNotes();
            }
    /*var dispatchNotes =
        [{ text: 'Dispatch note 1', link: '1'},
         { text: 'Dispatch note 2', link: '2'},
         { text: 'Dispatch note 3', link: '3'}];*/
    
    // For testing refresh
    var test =
        [{ text: 'Updated 1', link: '1'},
         { text: 'Updated 2', link: '2'}];

    return {
        dispatchNotes: function() {
            return dispatchNotes();
        },
        test: function() {
            return test;
        }
    }
}])

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
}])
.factory('DBService', function($q){
                //window.shimIndexedDB.__useShim();
                console.log("no database exists");
                var db = new Dexie("localSIM");
                db.version(1).stores({ dispatchNotes: "id", order: "id,did,[did+id],relation"});
                //test data
                db.on('ready', function () {
                    db.dispatchNotes.add({id: "N104", description: "CJ-TUBE-0140", date: "P4/2/2015"});
                    db.dispatchNotes.add({id: "N105", description: "CJ-TUBE-0141", date: "P4/2/2015"});
                    db.dispatchNotes.add({id: "N106", description: "CJ-TUBE-0142", date: "P4/2/2015"});
                    db.dispatchNotes.add({id: "N107", description: "CJ-TUBE-0143", date: "P4/2/2015"})
                    db.order.add({did:"N104", id:"AK029250", quantity: "5", weight: "30"});
                    db.order.add({did:"N104", id:"AK028890", quantity: "10", weight: "300"});
                    db.order.add({did:"N105", id:"AK029255", quantity: "1", weight: "320"});
                    db.order.add({did:"N105", id:"AK028896", quantity: "14", weight: "34"});
                });
                db.open();

        var getDispatchNotes = function(){
        var deferred = $q.defer();
        db.dispatchNotes.toArray(function(result) {
                            console.log(JSON.stringify(result));
                            deferred.resolve(result);
                            }); 
        db.order.toArray(function(result) {
                            console.log(JSON.stringify(result))});                             
        return deferred.promise;
        };
        
        var getOrders = function(id){
            console.log("idtype:"+id);
            var deferred = $q.defer();
           db.order.where("did").equals(id).toArray(function(result) {
                            console.log(JSON.stringify(result));
                            deferred.resolve(result);
                            });                   
            return deferred.promise;
        }
        
        var idType =  function(scanId){
            console.log("idtype:"+scanId);
            var deferred = $q.defer();
            db.dispatchNotes.get(scanId).then(function(result) {
                
                if(result){
                        alert(JSON.stringify(result));
                        deferred.resolve({'type':"dispatch", 'dispatchId':result.id});
                }
            
            });
            db.order.get(scanId).then(function(result) {
                console.log(result);
                        if(result){
                            alert(JSON.stringify(result));
                            deferred.resolve({'type':"order", 'dispatchId':result.did,'orderId':result.id});
                         }
                         });
            
            return deferred.promise;
        }
        
         return {
             getDispatchNotes: function() {
                 return getDispatchNotes();
            },
             getOrders: function(id){
                 return getOrders(id);
         },
             idType: function(id){
                 return idType(id);
         }
         }
})
}());
