// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function(){angular.module('app', ['ionic', 'ngMockE2E', 'app.controllers', 'app.services'])

// HTTPBACKEND: This is for testning http calls only!
.run(function($rootScope, $ionicPlatform, $httpBackend, $http) {
    
    $httpBackend.whenGET('https://test').respond(function(method, url, data, headers){
        return [200, {test: 'success'}];
    });
    
    $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
        var data = angular.fromJson(data);
        alert(data.username +' ' + data.password);

        if(data.username == 'admin' && data.password =='admin'){
            return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
        }
        else{ 
            return [401 , {authorizationToken: 'false'}]
        } 
    });
    
    $httpBackend.whenGET(/.*/).passThrough();
    
})

.run(function($rootScope, $ionicPlatform, $ionicHistory, $state, $location) {
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
    
    // For Android and Windows phone backbutton!
    $ionicPlatform.registerBackButtonAction(function () {
        if ($state.is('menu.home') || $state.is('menu.history') || $state.is('menu.help') || $state.is('menu.about') || $state.is('signin')) {
            navigator.app.exitApp();
        } 
        else {
            var url = $location.path();
            url = url.slice(0,url.lastIndexOf('/'));
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
            });
            $location.path(url).replace();
            $rootScope.$apply();
        }
    }, 100);
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
    url: '/home',
    views :{
        'menuContent': {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }
    }
  })
  
  .state('menu.history', {
      url: '/history',
      views: {
          'menuContent':{
              templateUrl: 'partials/history.html',
              controller: 'HistoryCtrl'
          }
      }
  })
  .state('menu.about', {
      url: '/about',
      views: {
          'menuContent': {
              templateUrl: 'partials/about.html',
              controller: 'AboutCtrl'
          }
      }
  })
  .state('menu.orders', {
      url: '/home/:dispatchId',
      views: {
          'menuContent': {
              templateUrl: 'partials/orders.html',
              controller: 'OrdersCtrl'
          }
      }
  })
  .state('menu.order', {
      url: '/home/:dispatchId/:orderId',
      views: {
          'menuContent': {
              templateUrl: 'partials/order.html',
              controller: 'OrderCtrl'
          }
      } 
  })
  .state('signin', {
      cache: false,
      url: '/signin',
      templateUrl: 'partials/signin.html',
      controller: 'SigninCtrl'
  })
  
  $urlRouterProvider.otherwise('/signin');
});
           }());