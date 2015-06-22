/*
    Controller for About module.
    Contains funtionality for changing language.
*/
(function(){
    angular.module('app.aboutCtrl', ['app.translate'])

    .controller('AboutCtrl', ["$scope", "$translate", function($scope, $translate) {
        $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        };   
    }])
}())