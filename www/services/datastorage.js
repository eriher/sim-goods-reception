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
                    Toast.toast("Dispatch:"+id+" marked as checked");
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
        var dispatches = data.dispatchrows
        for(dispatch in dispatches)
            if(dispatches[dispatch].id == id)
                return id
        return null
    }
    var sync = function() {
        var syncData = [];
        var deferred = $q.defer();
    if(localStorage.getItem['uncommited'])
        console.log("uncommited")
        //Network.post().then(function(succes){return sync()})
    else{
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
                console.log(syncData);
                data = sort(syncData);
                updateLocalStorage();
                deferred.resolve();
            }
        },function(fail){
            console.log("fail in datastorage");
        })
    }
        return deferred.promise
        }
    
        function sort(indata) {
            console.log("hej");
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

            var result = [];

            for(var x in groups) {
                if(groups.hasOwnProperty(x)) {
                    var obj = {};
                    obj["dispatch"] = x;
                    obj["status"] = "unchecked";
                    obj["checkedPallets"] = 0;
                    obj["numPallets"] = groups[x].length;
                    obj["customerID"] = (groups[x])[0].Item.CustomerID;
                    obj["supplierID"] = (groups[x])[0].Item.SupplierID;
                    obj["pallets"] = groups[x];
                    result.push(obj);
                }
            }
            console.log(result);
            return result;
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
        },
        getUserInfo: function() {
            return getUserInfo();
        } 
    }
    
})
}())