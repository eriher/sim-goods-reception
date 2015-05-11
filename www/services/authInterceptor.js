(function() {
    angular.module('app.services.authInterceptor', [])
// Intercepts 401 https statuses
.factory('AuthInterceptor', function ($rootScope, $q) {
  return {
    responseError: function (response) {
        if (response.status === 401){
            $rootScope.$broadcast({401: 'event:auth-loginRequired',}[response.status], response);
              return $q.reject(response);
        }
        return $q.reject(response);
    }
  };
})
}())