    /**
    *
    *Handles storage, getting and structuring of data
    *
    **/
(function() {
    angular.module('app.services.dataStorage', [])

.factory('DataStorage', ["$q", "$rootScope", "Network", "Toast", function($q, $rootScope, Network, Toast){
        
    //variablee for storing most data in application, should probably move over to using local storage directly
    var data = [];
        
    //updates localstorage, to be called after data hase been altered. Should be replaced with some double data binding
    var updateLocalStorage = function() {
            window.localStorage['data'] = JSON.stringify(data);
        }
    
        /*
        Gets userinfo from intel secure storage
        returns: object user {username, passowrd}
        */
        var getUserInfo = function() {
            var deferred = $q.defer();
            intel.security.secureStorage.read(
            function(instanceID){
                return intel.security.secureData.getData(
                    function(data){
                        data = JSON.parse(data);
                        deferred.resolve(data);
                    }, 
                    function(errorObj){
                        console.log('fail: code = '+errorObj.code+', message = '+errorObj.message);
                    }, instanceID

                ); 
            },
            function(errorObj){
                console.log('fail: code = '+errorObj.code+', message = '+errorObj.message);
                return undefined;
            },{'id':'1'})
            return deferred.promise;
        }

    //Getter for data array
    var getData = function() {
        return data;
    }
    /*
    *Get delivery by deliverynotenumber
    *expects: deliverynotenumber
    *returns: if exist: delivery object, else: null
    */
    var getDispatch = function(id) {
        console.log("getpallets"+id)
        for(var i = 0; i<data.length; i++)
            if(data[i].dispatch == id)
                return data[i];
        return null;
    }
    /*
    *Checks if a stool exists
    *expects: stoolid
    *returns: if exists: delivernotenumber with existing stool, else: null
    */
    var palletExist = function(id) {
        for(var i = 0; i<data.length; i++)
            for(var j = 0; i<data[i].pallets.length; i++)
                if(id == data[i].pallets[j].StoolID)
                    return data[i].dispatch;
        return null;
    }
    /*
    *Checks if a delivery exists
    *expects: stoolid
    *returns: if exists: true , else: false
    */
    var dispatchExist = function(id) {
        if(getDispatch(id))
            return true;
        else
            return false;
    }
    /*
    *Syncs data with server
    */
    var sync = function() {
        data = JSON.parse(window.localStorage['data'] || '[]');
        var syncData = [];
        var deferred = $q.defer();
    if(window.localStorage['syncData']){
        //Unsynced data in local storage, post to server.
        Network.post().then(function(succes){
            //move synced data to history and remove it from syncdata
            moveToHistory();
            window.localStorage.removeItem('syncData');
            //call sync again
            sync().then(function(success){
                deferred.resolve();
            });
        })
    }
    else{
        //No unsynced data, get data from server.
        Network.dbTestData().then(function(success){
                if(success[0].data[0].DeliveryNoteNumber == "Invalid token"){
                    //If token is unvalid, login the user and try again.
                    getUserInfo().then(function(success){
                        Network.login(success.username, success.password).then(function(data){
                            window.localStorage.setItem("token", data[0].Token)
                            sync().then(function(success){
                                deferred.resolve();
                            });
                        }, function(fail){
                            console.log(fail);
                        })
                    })
                }
                else{
                    //If token is valid, structure the data
                    for(var i =0; i < success.length; i++)
                        for(var j =0; j < success[i].data.length; j++)
                            syncData.push(success[i].data[j]);
                    structure(syncData);
                    deferred.resolve();     
                }
            },function(fail){
                console.log("fail in datastorage");
                deferred.resolve();
            })
        }   
    return deferred.promise
    }
        /*
        *structures data for usage in the app. Data recieved is unstructured, will be grouped by deliverynotenumber
        *expects: array of objects
        *returns: array of objects grouped by deliverynotenumber
        */
        function structure(indata) {
            var groups = {};

            for(var i = 0; i < indata.length; i++) {
                var item = indata[i];
                
                if(!groups[item.DeliveryNoteNumber]) {
                    groups[item.DeliveryNoteNumber] = [];
                }
                item["status"] = "unchecked";
                groups[item.DeliveryNoteNumber].push(item);
            }
            //checks if dispatch was already in localstorage
            for(var i = 0; i < data.length; i++){
                if(groups[data[i].dispatch]){
                    console.log("found existing dispatch")
                    delete groups[data[i].dispatch]
                }
            }

            for(var x in groups) {
                if(groups.hasOwnProperty(x)) {
                    console.log("group has dispatch" + x);
                    var obj = {};
                    obj["dispatch"] = x;
                    obj["status"] = "incoming";
                    obj["checkedPallets"] = 0;
                    obj["numPallets"] = groups[x].length;
                    obj["customerID"] = (groups[x])[0].CustomerID;
                    obj["supplierID"] = (groups[x])[0].SupplierID;
                    obj["pallets"] = groups[x];
                    data.push(obj);
                }
            }
            updateLocalStorage();
    }
        /**
        *adds data to syncdata localstorage
        *expects: object dispatch
        */
        var addSyncData = function(dispatch) {
            console.log("addsyncdata"+dispatch.dispatch);
            var syncData = JSON.parse(window.localStorage['syncData'] || '[]');
            var obj = {};
            obj["DeliveryNoteNumber"] = dispatch.dispatch;
            var pallets = [];
            for(var i = 0; i < dispatch.pallets.length; i++)
                if(dispatch.pallets[i].status != "confirmed")
                   pallets.push({StoolID: dispatch.pallets[i].StoolID, Qty: dispatch.pallets[i].Qty})
            if(pallets.length > 0)
                obj["pallets"] = [];
            syncData.push(obj)
            window.localStorage["syncData"] =  JSON.stringify(syncData);
        }
        /**
        *moves syncdata to history
        **/
        var moveToHistory = function(){
            var syncData = JSON.parse(window.localStorage['syncData']);
            var history = JSON.parse(window.localStorage['history'] || '[]')
            for(var i = 0; i < data.length; i++)
            {
                //checks if items of syncdata contains a dispatch
                if(syncData.some(function(item){
                    return item.DeliveryNoteNumber == data[i].dispatch
                })){
                    //if it does put it in history and remove it from data
                    var syncitem = data.splice(i,1)[0]
                    syncitem["status"]="synced";
                    history.push(syncitem);
                }
                console.log(data);
            }
            updateLocalStorage();
            console.log("store history")
            window.localStorage['history'] = JSON.stringify(history);
        }
        //getter for history, not really needed can just be called in controllers
        var getHistory = function() {
            return JSON.parse(window.localStorage['history'] || '[]')
        }
    return {
        getData : function(){
            return getData();
        },
        sync : function(){
            return sync();
        },
        getDispatch : function(id) {
            return getDispatch(id);
        },
        palletExist: function(id){
            return palletExist(id);
        },
        dispatchExist: function(id){
            return dispatchExist(id);
        },
        getUserInfo: function() {
            return getUserInfo();
        },
        addSyncData: function(dispatch) {
            return addSyncData(dispatch);
        },
        updateLocalStorage: function(){
            return updateLocalStorage();
        },
        clearData: function() {
            data = [];
        },
        getHistory: function(){
            return getHistory();
        }
    }
    
}])
}())