(function(){
    angular.module('app.aboutCtrl', ['app.translate'])

    .controller('AboutCtrl', function($scope, $translate) {
        $scope.me = 5;
        $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        };   
    })
}())