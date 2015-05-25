(function(){angular.module('app.palletsCtrl', [])
.controller('PalletsCtrl', function($scope, $stateParams, $state, Network, $location, $ionicActionSheet, $ionicPopup, $filter, pallets, count, dispatchCheck, palletId) {

        $scope.$on('$ionicView.afterEnter', function () {
            if(palletId){
                $scope.searchText = palletId;
                $scope.showSearch = true;
            }
        })
        
        $scope.me = 5;
        $scope.swipeRight = function(){
            $scope.$parent.back();
        }
        
        $scope.palletId = palletId;
        $scope.pallets = pallets;
        $scope.count = count();

        $scope.show = function(pallet) {
            var quantity = pallet.quantity;
            $scope.adjust = quantity;
               // Show the action sheet
           var hideSheet = $ionicActionSheet.show({
                     buttons: [
                       { text: '<i class="icon ion-happy"></i>'+$filter('translate')('BUTTON_PALLETS_CONFIRM')  },
                       { text: '<i class="icon ion-hammer"></i>'+$filter('translate')('BUTTON_PALLETS_ADJUST')  }
                     ],
                     destructiveText: '<i class="icon ion-nuclear"></i>'+$filter('translate')('BUTTON_PALLETS_LOST'),
                     titleText: $filter('translate')('BUTTON_PALLETS_STATUS')+': '  +pallet.id,
                     cancelText: '<i class="icon ion-sad"></i>'+$filter('translate')('BUTTON_PALLETS_CANCEL'),
                     cancel: function() {
                          hideSheet();
                        },
                     buttonClicked: function(index) {
                         switch(index){
                                 case 0:
                                        pallet.status = 'confirmed';
                                        $scope.count = count();
                                        dispatchCheck(pallet.did);
                                        break;
                                 case 1:
                                        $ionicPopup.show({
                                                template: '<input type="number" min="0" ng-model="$parent.adjust">',
                                                title: 'Adjust pallet',
                                                subTitle: 'Adjust the quantity',
                                                scope: $scope,
                                                buttons: [
                                                  { text: 'Cancel' },
                                                  {
                                                    text: '<b>Confirm</b>',
                                                    type: 'button-positive',
                                                    onTap: function(e) {
                                                        console.log("tapped"+$scope.adjust);
                                                      if ($scope.adjust == pallet.quantity) {
                                                           console.log("prevent");
                                                        //don't allow the user to close unless he enters wifi password
                                                        e.preventDefault();
                                                      } else {
                                                          console.log("adjusted");
                                                          pallet.weight = (pallet.weight/pallet.quantity)*$scope.adjust;
                                                          pallet.quantity = $scope.adjust;
                                                          pallet.status = 'adjusted';
                                                          $scope.count = count();
                                                          dispatchCheck(pallet.did);
                                                      }
                                                    }
                                                  }
                                                ]
                                        })
                                        break;
                                    
                         }
                       return true;
                     },
                    destructiveButtonClicked: function(){
                        pallet.status="lost";
                        $scope.count = count();
                        dispatchCheck(pallet.did);
                        return true
                    }
           });
        }
    
    $scope.navTitle= 'Dispatch Id: '+$stateParams.dispatchId;
    $scope.mess = 5;
    
    
})
}())