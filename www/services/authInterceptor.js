(function() {
//Event fires when server returns http 401 (unAuthenticated), tries to login the user again
    angular.module('app.services.authInterceptor', [])
// Intercepts 401 https statuses
.factory('AuthInterceptor', function ($rootScope, $q) {
  return {
    responseError: function (response) {
        alert('auth interceptor :' +response)
        if (response.status === 401){
            $rootScope.$broadcast({401: 'event:auth-loginRequired',}[response.status], response);
              return $q.reject(response);
        } 
        return $q.reject(response);
    }
  };
})
}())