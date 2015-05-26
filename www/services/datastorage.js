(function() {
    angular.module('app.services.dataStorage', [])

.factory('DataStorage', function($q, $rootScope, Network, Toast){
        var data = [];
        var updateLocalStorage = function() {
        window.localStorage['data'] = JSON.stringify(data);
        }
        
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

        
    var getData = function() {
        return data;
    }
    var getDispatch = function(id) {
        console.log("getpallets"+id)
        for(var i = 0; i<data.length; i++)
            if(data[i].dispatch == id)
                return data[i];
        return [];
    }
    var palletExist = function(id) {
        var pallets = data.palletrows
        for(pallet in pallets)
            if(pallets[pallet].id == id)
                return [id,pallets[pallet].did]
        return null
    }
    var dispatchExist = function(id) {
        if(getDispatch(id) != [])
            return true;
        else
            return false;
    }
    var sync = function() {
        data = JSON.parse(window.localStorage['data'] || '[]');
        var syncData = [];
        var deferred = $q.defer();
    if(window.localStorage['syncData'])
        console.log("unsynced data")
        //Network.post().then(function(succes){return sync()})
        Network.dbTestData().then(function(success){
            if(success[0].data[0].DeliveryNoteNumber == "Invalid token")
            {
                getUserInfo().then(function(success){
                    Network.login(success.username, success.password).then(function(data){
                        window.localStorage.setItem("token", data[0].Token)
                        return sync()
                    }, function(fail){
                        console.log(fail);
                    })
                })
            }
            else{
                for(items in success)
                    for(item in success[items].data)
                        syncData.push(success[items].data[item]);
                structure(syncData);
                deferred.resolve();     
            }
        },function(fail){
            console.log("fail in datastorage");
            deferred.reject();
        })
        return deferred.promise
        }
    
        function structure(indata) {
            var groups = {};

            for(var i = 0; i < indata.length; i++) {
                var item = indata[i];

                if(!groups[item.DeliveryNoteNumber]) {
                    groups[item.DeliveryNoteNumber] = [];
                }

                groups[item.DeliveryNoteNumber].push({
                    Item: item,
                    status: "unchecked"
                });
            }
            
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
                    obj["status"] = "unchecked";
                    obj["checkedPallets"] = 0;
                    obj["numPallets"] = groups[x].length;
                    obj["customerID"] = (groups[x])[0].Item.CustomerID;
                    obj["supplierID"] = (groups[x])[0].Item.SupplierID;
                    obj["pallets"] = groups[x];
                    data.push(obj);
                }
            }
    }
        var addSyncData = function(dispatch) {
            console.log("addsyncdata"+dispatch.dispatch);
            var syncData = JSON.parse(window.localStorage['syncData'] || '[]');
            var obj = {};
            obj["DeliveryNoteNumber"] = dispatch.dispatch;
            obj["pallets"] = [];
            for(var i = 0; i < dispatch.pallets.length; i++)
                if(dispatch.pallets[i].status != "checked")
                    obj.pallets.push({StoolID: dispatch.pallets[i].Item.StoolID, Qty: dispatch.pallets[i].Item.Qty})
            syncData.push(obj)
            window.localStorage["syncData"] =  JSON.stringify(syncData);
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
        }
    }
    
})
}())