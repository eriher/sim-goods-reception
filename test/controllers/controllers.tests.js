describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('app.controllers'));
    beforeEach(module('app.services'));
    beforeEach(module('ionic'));
    
   

    beforeEach(inject(function($rootScope, $controller, $state) {
        scope = $rootScope.$new();
        $controller('AppCtrl', {$scope: scope});
    }));

    // tests start here
    it('Test should be true', function(){
        expect(scope.test).toEqual(true);
    });
});