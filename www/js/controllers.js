(function(){angular.module('app.controllers', ['app.translate'])

.controller('AppCtrl', function($scope, $state, MenuService, ScanService, ToastService, $ionicHistory, $location, DBService, SigninService, $ionicViewSwitcher) {

    $scope.menuItems = MenuService.items();
    
    // Kommentera bort userName för testning
    $scope.userName = JSON.parse(window.localStorage['user']).username;
    
    
    $scope.back = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
                });
 
            $ionicViewSwitcher.nextDirection('back');
            $state.go('menu.home')
        }
    
    $scope.menuClick = function(dest){
        $ionicHistory.nextViewOptions({
            disableBack: true,
            disableAnimate : true
        });
        if(dest == 'signin')
        {
            SigninService.logout();
        }
        $state.go(dest);

    }
    
    $scope.scanBtn = function(){
        ScanService.scan().then(
            function(result){
            //scan not cancelled by 
            if(!result.cancelled){
                var scanId = result.text;
                switch(scanId.charCodeAt(0)) {
                        case 78 :
                            DBService.scanDispatch(scanId).then(function(success){$state.go('menu.pallets', {dispatchId : success.dispatchId })},
                                                                function(fail){console.log(fail)});
                            break;
                        case 65 :
                            DBService.scanDispatch(scanId).then(function(success){$state.go('menu.pallets', {dispatchId : success.dispatchId })},
                                                                function(fail){console.log(fail)});
                            break;
                        case 83 :
                            DBService.scanPallet(scanId).then(function(success){$state.go('menu.pallets',{dispatchId: success.dispatchId, palletId: success.palletId})},
                                                             function(fail){console.log(fail)});
                            break;
                }}
                else{
                alert("Scan cancelled");
                }}
                ,function(reject){console.log("Scan failed:"+fail)})
    }
})

.controller('PalletCtrl', function(DBService, $scope, $stateParams, $ionicHistory) {
    var id = $stateParams.palletId;
    $scope.navTitle= 'Pallet nr: '+id;
    $scope.id = id;
    $scope.pallet = DBService.getPallet(id).then(
        function(success){console.log("palletctrl success:"+JSON.stringify(success));
                          $scope.pallet = success},
        function(fail){console.log("palletctrl fail:"+fail)});;
})


.controller('PalletsCtrl', function($scope, $stateParams, $state, NetworkService, DBService, $location, $ionicActionSheet, $ionicPopup, $filter) {

        $scope.$on('$ionicView.beforeEnter', function () {
                DBService.getPallets(id).then(
        function(success){console.log("palletsctrl success:"+JSON.stringify(success));
                          $scope.pallets = success;},
        function(fail){console.log("palletsctrl fail:"+fail)});
            
        })
        $scope.$on('$ionicView.afterEnter', function () {
            if(pid){
                document.getElementById(pid).scrollIntoView();
                document.getElementById("button_"+pid).click();
            }
            checked();
    })
        

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
                                        console.log("confirmed");
                                        DBService.setStatus("pallet", pallet,"confirmed");
                                        pallet.status = 'confirmed';
                                        checked();
                                        break;
                                 case 1:
                                        console.log("adjust");
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
                                                          DBService.setStatus("pallet", pallet,"adjusted");
                                                          pallet.status = 'adjusted';
                                                          checked();
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
                        console.log("lost");
                        DBService.setStatus("pallet", pallet,"lost");
                        pallet.status="lost";
                        checked();
                        return true
                    }
           });
        }
    var checked = function() {
        $scope.checked = DBService.countCheckedPallet(id)
    }
        
    var id = $stateParams.dispatchId;
    var pid = $stateParams.palletId;
    
    $scope.navTitle= 'Dispatch Id: '+id;
    $scope.items =  
        [{
            value: "id",
            label: "PALLETS_PALLET_ID"},
        {
            value: "aid",
            label: "PALLETS_ARTICLE_ID"
         },
          {
             value: "order",
             label: "PALLETS_ORDER_ID"
          },
         {
            value: "quantity",
            label: "PALLETS_QUANTITY"
          },
          {
             value: "weight",
             label: "PALLETS_WEIGHT"
          },
         {
             value: "status",
             label: "PALLETS_STATUS"
         }
         ]
    $scope.sort = $scope.items[0];
    
    
    $scope.setChecked = function(id){
        DBService.setChecked("pallet", id);
        checked();
    }
    
    
    $scope.goTo = function(id2) {
        console.log(id2);
        $state.go('menu.pallet', {dispatchId: id, palletId : id2 });
    }
    
})

.controller('HomeCtrl', function($scope, $state, $location,DBService, $ionicLoading, $filter, $translate) {
    
    //Sets date every minute
    $scope.today = new Date();
    setInterval(showDate, 60000);
    function showDate(){
       $scope.today = new Date();
        $scope.$apply();
    } 
    

        var updDisp = function(){    

    DBService.getDispatches().then(
        function(success){console.log("homeservice success:"+JSON.stringify(success));
                          $scope.dispatchNotes = success;
                         $scope.pallets = DBService.dispatchesForPallets(success)},
        function(fail){console.log("homeservice fail:"+fail)});}
    $scope.$on('dbupdated', function(event, args){
              updDisp();}
              )

    $scope.$on('$ionicView.beforeEnter', function () {
            updDisp();
    })
    
    $scope.goTo = function(id) { 
        $state.go('menu.pallets', {dispatchId : id });
    }
                                     

    $scope.refresh= function(){
        DBService.refreshDB();
        $scope.$broadcast('scroll.refreshComplete');
    };
})

.controller('AboutCtrl', function($rootScope, $scope, $translate) {
    $scope.navTitle = 'About';
    $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    };
        $scope.items =  
        [{
            value: "bar-light",
            label: "Light"
        },
        {
            value: "bar-stable",
            label: "Stable"
        },
        {
             value: "bar-positive",
             label: "Positive"
        },
        {
            value: "bar-calm",
            label: "Calm"
        },
        {
             value: "bar-balanced",
             label: "Balanced"
        },
        {
             value: "bar-energized",
             label: "Energized"
        }]
    $scope.selectedItem = $scope.items[0];   
})

.controller('HistoryCtrl', function($scope, $http) {
    $scope.navTitle = 'History';
    
    $scope.test = function(){
        $http.get('https://test')
        .success(function(data){
            console.log('testSuccess');
            alert(data.test);
        })
        .error(function(data, status, headers, config){
            console.log('testError');
        })
    }
})

.controller('SigninCtrl', function($scope, $state, SigninService, $ionicHistory) {

    $scope.signIn = function(user){
        SigninService.login(user.name, user.password); 
    }
    
    $scope.$on('$ionicView.beforeEnter', function () {
        //For navigation, clearHistory
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        
        //Check if previously checked in
        var loggedIn = window.localStorage['loggedIn'] || false;
        var user = JSON.parse(window.localStorage['user'] || '{}');
    
        if(loggedIn == 'true'){
            
            if(typeof user.username != 'undefined' && typeof user.password != 'undefined')
            {
                //Previously checked in, goes direct to home and picks up new authToken via loginTest
                $state.go('menu.home');
                SigninService.login(user.username, user.password);
                
            }
            
        }
    });

    //Event fires when the login is confirmed
    $scope.$on('event:auth-loginConfirmed', function() {
        $state.go('menu.home');
    });
    
    //Event fires when username and pw are not found by server
    $scope.$on('event:auth-login-failed', function(e, status) {  

        var error = "Login failed.";
        if (status == 400) {
          error = "Invalid Username or Password.";
        }
        alert(error);
        });
    
    //Event fires when server returns http 401 (unAuthenticated), login the user
    $scope.$on('event:auth-loginRequired', function(e, rejection) {
        var user = JSON.parse(window.localStorage['user'] || '{}');
        SigninService.login(user.username, user.password);
  });
});
}());
