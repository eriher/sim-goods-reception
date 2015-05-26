(function(){angular.module('app.palletsCtrl', [])
.controller('PalletsCtrl', function($scope, $stateParams, $state, Network, $location, $ionicActionSheet, $ionicPopup, $filter, dispatch, palletId, DataStorage) {

        $scope.$on('$ionicView.afterEnter', function () {
            if(palletId){
                $scope.searchText = palletId;
                $scope.showSearch = true;
            }
        })
        
        
        $scope.swipeRight = function(){
            $scope.$parent.back();
        }
        
        $scope.palletId = palletId;
        $scope.dispatch = dispatch;
        $scope.navTitle= 'Dispatch: '+dispatch.dispatch;
    
        $scope.show = function(pallet) {
            var quantity = pallet.Item.Qty;
            $scope.adjust = quantity;
               // Show the action sheet
           var hideSheet = $ionicActionSheet.show({
                     buttons: [
                       { text: '<i class="icon ion-happy"></i>'+$filter('translate')('BUTTON_PALLETS_CONFIRM')  },
                       { text: '<i class="icon ion-hammer"></i>'+$filter('translate')('BUTTON_PALLETS_ADJUST')  }
                     ],
                     destructiveText: '<i class="icon ion-nuclear"></i>'+$filter('translate')('BUTTON_PALLETS_LOST'),
                     titleText: $filter('translate')('BUTTON_PALLETS_STATUS')+': '  +pallet.Item.StoolID,
                     cancelText: '<i class="icon ion-sad"></i>'+$filter('translate')('BUTTON_PALLETS_CANCEL'),
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
                                                template: '<input type="number" min="1" ng-model="$parent.adjust">',
                                                title: 'Adjust pallet',
                                                subTitle: 'Adjust the quantity',
                                                scope: $scope,
                                                buttons: [
                                                  { text: 'Cancel' },
                                                  {
                                                    text: '<b>Confirm</b>',
                                                    type: 'button-positive',
                                                    onTap: function(e) {
                                                      if ($scope.adjust == pallet.Item.Qty) {
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
                                alert("Dispatch: "+dispatch.dispatch+" has been marked as checked");
                            }
                        return true
                    }
           });
        }
    $scope.mess = 5;
    
    
})
}())