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
        Network.dbTestData().then(function(success){
            console.log(success);
            for(items in success)
                for(item in success[items].data)
                    data.push(success[items].data[item]);
            updateLocalStorage();
            deferred.resolve();
        },function(fail){
            console.log("fail in datastorage");
        })
    else
        Network.dbTestData().then(function(success){
            data = success;
            localStorage.setItem['uncommited'] = 'true';
            updateLocalStorage();
            deferred.resolve();
        },function(fail){
            data = localStorage.getItem['data'];
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
        },
        getUserInfo: function() {
            return getUserInfo();
        } 
    }
    
})
}())