describe('Services', function(){
   
    beforeEach(module('app'));
    beforeEach(module('app.services'));
    beforeEach(module('ionic'));
    
   describe('AppCtrl', function(){

        beforeEach(inject(function($rootScope, $controller, $state, $location) {
            scope = $rootScope.$new();
            $controller('AppCtrl', {$scope: scope});
            state = $state;
            location = $location;
        }));

        // ==== Tests start here =====


        // Unit tests:

        it('Unit test: menuItems should be defined',function(){
            expect(scope.menuItems).toBeDefined();
        });

       
    })
    
});