(function() {
    angular.module('app.services', [
        'app.services.authInterceptor',
        'app.services.dataStorage',
        'app.services.menu',
        'app.services.network',
        'app.services.scan',
        'app.services.signin',
        'app.services.toast'
    ])
    

 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
}());