/*
 Copyright 2015 Olof Spetz, Erik Hermansson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
*/
(function(){angular.module('app', [
    'ionic',
    'app.translate',
    'app.services',
    'app.palletsCtrl',
    'app.homeCtrl',
    'app.signinCtrl',
    'app.aboutCtrl',
    'app.menuCtrl',
    'app.historyCtrl',
    'app.filters',
    'app.signin'
])

.run(function($rootScope, $ionicPlatform, $ionicHistory, $state, $translate, $ionicPopup, Signin, DataStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
  
        //Auto login 
        DataStorage.getUserInfo().then(function(success) {
            if(states[networkState] != 'No network connection'){
                Signin.login(success.username, success.password)
            }
            else{
                console.log('No internet but saved user! Go home');
                $rootScope.$broadcast('event:auth-loginConfirmed', status);
            }
                 
        });
        //For Intel Security API
        
         
        // 
        //Get preferred Language and sets it to current language
        //If preferred language not available in translate.js, use default
        navigator.globalization.getPreferredLanguage(
        function (language) {
            if(language.value == 'sv-SE' || language.value == 'en-US')
            {
                $translate.use(language.value)
                console.log('Preferred language' + language.value +' available')
            }
            else
                console.log('Preferred language' + language.value +'not available, using default')
        },
        function () {
            console.log ('Error getting language, using default..\n');
        }
        );

    };
    
    // For Android and Windows phone, controlling the backbutton!
    $ionicPlatform.registerBackButtonAction(function () {
        if ($state.is('menu.home') || $state.is('signin') || $state.is('menu.history') || $state.is('menu.help') || $state.is('menu.about')) {    
                var confirmPopup = $ionicPopup.confirm({
                title: 'Exit',
                template: 'Are you sure you want to exit?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        navigator.app.exitApp();
                    } 
                });   
            
        } 
        else {
            $ionicHistory.nextViewOptions({
                disableBack: true
                });
            $state.go('menu.home');
        }
    }, 140);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('menu', {
      cache: false,
      url: '/menu',
    abstract: true,
    templateUrl: 'menu/menu.html',
    controller: 'MenuCtrl',
    resolve: {
        dataReady: function(DataStorage){
            return DataStorage.sync();
        }
    }
  })
  
  .state('menu.home', {
      cache: false,    
      url: '/home/',
    views :{
        'menuContent': {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl',
            resolve: {
                dispatches: function(dataReady, DataStorage){
                    return function() {
                        return DataStorage.getData()
                    };
                }
            }
        }
    }
  })
  .state('menu.history', {
      cache: false,    
      url: '/history/',
    views :{
        'menuContent': {
            templateUrl: 'history/history.html',
            controller: 'HistoryCtrl',
            resolve: {
                history: function(dataReady, DataStorage){
                    return DataStorage.getHistory()
                }
            }
        }
    }
  })
  .state('menu.about', {
      cache: false,
      url: '/about/',
      views: {
          'menuContent': {
              templateUrl: 'about/about.html',
              controller: 'AboutCtrl'
          }
      }
  })
  .state('menu.help', {
      cache: false,
      url: '/help/',
      views: {
          'menuContent': {
              templateUrl: 'help/help.html'
          }
      }
  })
  .state('menu.pallets', {
      cache: false,
      url: '/home/:dispatch?pallet',
      views: {
          'menuContent': {
              templateUrl: 'pallets/pallets.html',
              controller: 'PalletsCtrl',
              resolve: {
                  dispatch: function(DataStorage, $stateParams){
                      return DataStorage.getDispatch($stateParams.dispatch);
                  },
                  pallet: function($stateParams) {
                      return $stateParams.pallet
                  }
              }
            }
        }
  })
  .state('signin', {
      cache: false,
      url: '/signin/',
      templateUrl: 'signin/signin.html',
      controller: 'SigninCtrl'
  })

  
  $urlRouterProvider.otherwise('/signin/');
});
}());