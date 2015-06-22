/*
    Controller for Pallets module.
    Contains functonality to display dispatch notes.
*/

(function(){angular.module('app.palletsCtrl', [])
.controller('PalletsCtrl', ["$scope", "$stateParams", "$state", "Network", "$location", "$ionicActionSheet", "$ionicPopup", "$filter", "dispatch", "pallet", "DataStorage", function($scope, $stateParams, $state, Network, $location, $ionicActionSheet, $ionicPopup, $filter, dispatch, pallet, DataStorage) {

        
    $scope.$on('$ionicView.beforeEnter', function () {
        if(pallet){
                $scope.type = $scope.items[1];
                $scope.text = pallet;
        }
    })
    $scope.swipeRight = function(){
        $scope.$parent.back();
    }
    $scope.navTitle = dispatch.dispatch;
    $scope.dispatch = dispatch;
    $scope.items =  
        [{
            value: "",
            label: "------",
            text: "------",
        },
        {
            value: "StoolID",
            label: "StoolID",
            text: "StoolID",
        },
        {
            value: "status",
            label: "status",
            text: "status",
        },
        {
            value: "ArticleNumber",
            label: "ArticleNumber",
            text: "ArticleNumber",
        },
         {
              value: "OrderNumber",
            label: "OrderNumber",
            text: "OrderNumber",
         },
        {
            value: "SupplierID",
            label: "SupplierID",
            text: "SupplierID",
        }]
    $scope.type = $scope.items[0];
    
    // Filter function, should be moved to own directiv
    $scope.selectType = function() {
       var hideSheet = $ionicActionSheet.show({
                 buttons: $scope.items,
                 titleText: "filter",
                 cancelText: "cancel",
                 cancel: function() {
                        hideSheet();
                },
                buttonClicked: function(index) {
                    $scope.type = $scope.items[index];
                    return true;
                }
           });
    }
    
    
        $scope.affirmWindow = function(pallet) {
            var quantity = pallet.Qty;
            $scope.adjust = quantity;
               // Show the action sheet
           var hideSheet = $ionicActionSheet.show({
                     buttons: [
                       { text: '<i class="icon ion-checkmark-circled"></i>'+$filter('translate')('BUTTON_PALLETS_CONFIRM')  },
                       { text: '<i class="icon ion-edit"></i>'+$filter('translate')('BUTTON_PALLETS_ADJUST')  }
                     ],
                     destructiveText: '<i class="icon ion-minus-circled"></i>'+$filter('translate')('BUTTON_PALLETS_LOST'),
                     titleText: $filter('translate')('BUTTON_PALLETS_STATUS')+': '  +pallet.StoolID,
                     cancelText: '<i class="icon ion-close-round"></i>'+$filter('translate')('BUTTON_PALLETS_CANCEL'),
                     cancel: function() {
                          hideSheet();
                        },
                     buttonClicked: function(index) {
                         switch(index){
                                 case 0:
                                        if(pallet.status == "unchecked")
                                            dispatch.checkedPallets++;
                                        pallet.status = 'confirmed';
                                        DataStorage.updateLocalStorage();
                                        break;
                                 case 1:
                                        $ionicPopup.show({
                                                template: '<input type="tel" min="0" ng-model="$parent.adjust">',
                                                title: 'Adjust pallet',
                                                subTitle: 'Adjust the quantity',
                                                scope: $scope,
                                                buttons: [
                                                  { text: 'Cancel' },
                                                  {
                                                    text: '<b>Confirm</b>',
                                                    type: 'button-positive',
                                                    onTap: function(e) {
                                                      if ($scope.adjust == pallet.Qty) {
                                                        e.preventDefault();
                                                      } else {
                                                          if(pallet.status == "unchecked")
                                                            dispatch.checkedPallets++;
                                                          pallet.Qty = $scope.adjust;
                                                          pallet.status = 'adjusted';
                                                          DataStorage.updateLocalStorage();
                                                      }
                                                    }
                                                  }
                                                ]
                                        })
                                        break;
                                    
                         }
                         if(dispatch.checkedPallets == dispatch.numPallets && dispatch.status != "checked")
                            {
                                DataStorage.addSyncData(dispatch);
                                dispatch.status = "checked";
                                DataStorage.updateLocalStorage();
                                alert("Dispatch: "+dispatch.dispatch+" has been marked as checked");
                            }
                       return true;
                     },
                    destructiveButtonClicked: function(){
                        if(pallet.status == "unchecked")
                            dispatch.checkedPallets++;
                        pallet.status="lost";
                        DataStorage.updateLocalStorage();
                        if(dispatch.checkedPallets == dispatch.numPallets && dispatch.status != "checked")
                            {
                                DataStorage.addSyncData(dispatch);
                                dispatch.status = "checked";
                                DataStorage.updateLocalStorage();
                                alert("Dispatch: "+dispatch.dispatch+" has been marked as checked");
                            }
                        return true
                    }
           });
        }  
}])
}())