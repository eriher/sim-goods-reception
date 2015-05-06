// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function(){angular.module('app', ['ionic', 'ngMockE2E','app.translate', 'app.controllers', 'app.services'])

// HTTPBACKEND: This is for testning http calls only!
.run(function($rootScope, $ionicPlatform, $httpBackend, $http) {
    var token = "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy";
    var db =  {      // rows with test data
        dispatchrows: [
            {id: "N104", description: "CJ-TUBE-0140", date: "D040915", status: "incoming"},
            {id: "N105", description: "CJ-TUBE-0141", date: "D040915", status: "checked with errors"},
            {id: "N106", description: "CJ-TUBE-0142", date: "D040915", status: "partially checked"},
            {id: "N107", description: "CJ-TUBE-0143", date: "D040915", status: "checked"}
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
            {id:"S395", did:"N104", quantity: 80, weight: "40", status: "unchecked", aid:"P407305", order:"AK028890"}]
            }
     var db2 =  {      // rows with test data
        dispatchrows: [
        ],
        palletrows: []
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
        
        if(data.username == 'a' && data.password =='a'){
            return  [200 , { authorizationToken: token } ];
        }
        else{ 
            return [402];
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
    }, 201);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'partials/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('menu.home', {
    url: '/home/',
    views :{
        'menuContent': {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
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