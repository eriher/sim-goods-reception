// Ionic Starter App

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

(function(){angular.module('app', ['ionic', 'ngMockE2E','app.translate', 'app.controllers', 'app.services'])

// HTTPBACKEND: This is for testning http calls only!
.run(function($rootScope, $ionicPlatform, $httpBackend, $http) {
    var token = "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy";
    var db =  {      // rows with test data
        dispatchrows: [
            {id: "N104", description: "CJ-TUBE-0140", date: "D040915", status: "incoming"},
            {id: "N105", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N106", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N107", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N108", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N109", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N110", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N111", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N112", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N113", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N114", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N115", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N116", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N117", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N118", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N119", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N120", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"},
            {id: "N121", description: "CJ-TUBE-0141", date: "D040915", status: "incoming"}
        ],
        palletrows: [
            {id:"S376", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S377", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S378", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S379", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S380", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S381", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S382", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S383", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S384", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S385", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S386", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S387", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S388", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S389", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S390", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S391", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S392", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S393", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S394", did:"N104", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S395", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S999", did:"N105", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S998", did:"N105", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S997", did:"N105", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S996", did:"N105", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S1", did:"N106", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S2", did:"N106", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S3", did:"N107", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S4", did:"N107", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S5", did:"N108", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S6", did:"N109", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S7", did:"N109", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S8", did:"N110", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S9", did:"N111", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S10", did:"N111", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"},
            {id:"S11", did:"N112", quantity: 15, weight: "7.5", status: "unchecked", aid:"P407300", order:"AK029250"},
            {id:"S12", did:"N113", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"}]
            }
     var db2 =  {      // rows with test data
        dispatchrows: [
        ],
        palletrows: [
            
        ]
            }
     $httpBackend.whenGET('https://login').respond([{id:1, name: "hej"}]);
            
    
    //Dummy backend, always return 401
    $httpBackend.whenGET('https://test').respond(function(method, url, data, headers){
        if(headers.Authorization == 'test'){
            return [200, {test: 'success'}];
        }
        else{
            return [401];
        }
        
    });
    
    //Dummy backend, for login
    $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
        var data = angular.fromJson(data);
        
        if(data.username=='a' && data.password =='a'){
            return  [200 , { authorizationToken: token } ];
        }
        else{ 
            return [406];
        } 
    });
    //Dummy backend for getting db
    $httpBackend.whenGET('https://database').respond(function(method,url,data,headers){
        if(headers.Authorization == token)
        {
            return [200, {db: db}];
        }
        else
            return [403];
    })
    $httpBackend.whenGET('https://database2').respond(function(method,url,data,headers){
        if(headers.Authorization == token)
        {
            return [200, {db: db2}];
        }
        else
            return [404];
    })
    $httpBackend.whenPOST('https://database').respond(function(method,url,data,headers){
        var data = angular.fromJson(data);
        console.log("dbpost"+data.token+data.id)
        if(headers.Authorization == token)
        {
            db2.palletrows.push({id:data.id, did:"N104", quantity: 15, weight: "7.5", status: data.status, aid:"P407300", order:"AK029250"});
            return [200];
        }
        else
            return [404];
    })
    

    $httpBackend.whenGET('https://logout').respond(function(method, url, data) {
    return [200];
    });


    $httpBackend.whenGET(/.*/).passThrough();
    
})

.run(function($rootScope, $ionicPlatform, $ionicHistory, $state, $location, $translate) {
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
    //Get preferred Language and sets it to current language
    //If preferred language not available in translate.js, use default
    function onDeviceReady() {
        
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
            navigator.app.exitApp();
        } 
        else {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
                });
 
            $state.go('menu.home');
        }
    }, 140);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'partials/menu.html',
    controller: 'AppCtrl',
    resolve: {
        dataReady: function($log, DataStorage){
            return DataStorage.sync().then(function(){
                $log.log(DataStorage.getData());
                $log.log("database synced");
            })
        }
    }
  })
  
  .state('menu.home', {
    url: '/home/',
    views :{
        'menuContent': {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            resolve: {
                data: function(dataReady, DataStorage){
                    return DataStorage.getData()
                },
                counts: function(dataReady, DataStorage){
                    return function(){ return DataStorage.getDispatchesCount()}
                }
            }
        }
    }
  })

  .state('menu.history', {
      url: '/history/',
      views: {
          'menuContent':{
              templateUrl: 'partials/history.html',
              controller: 'HistoryCtrl'
          }
      }
  })
  .state('menu.about', {
      url: '/about/',
      views: {
          'menuContent': {
              templateUrl: 'partials/about.html',
              controller: 'AboutCtrl'
          }
      }
  })
  .state('menu.pallets', {
      url: '/home/:dispatchId?palletId',
      views: {
          'menuContent': {
              templateUrl: 'partials/pallets.html',
              controller: 'PalletsCtrl',
              resolve: {
                  pallets: function(DataStorage, $stateParams){
                      console.log($stateParams.dispatchId)
                      var pallets = DataStorage.getPallets($stateParams.dispatchId);
                      console.log(pallets)
                      return pallets;
                  },
                  count: function(DataStorage, $stateParams){
                      return function(){ return DataStorage.getCount($stateParams.dispatchId)};
                  },
                  dispatchCheck: function(DataStorage){
                      return function(id){return DataStorage.checkDispatchStatus(id)}
                  }
              }
          }
      }
      
  })
  .state('menu.pallet', {
      url: '/home/:dispatchId/:palletId',
      views: {
          'menuContent': {
              templateUrl: 'partials/pallet.html',
              controller: 'PalletCtrl'
          }
      } 
  })
  .state('signin', {
      cache: false,
      url: '/signin/',
      templateUrl: 'partials/signin.html',
      controller: 'SigninCtrl'
  })
  
  $urlRouterProvider.otherwise('/signin/');
});
           }());