describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('app.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('AboutCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have enabled friends to be true', function(){
        expect(scope.test).toEqual(true);
    });
});