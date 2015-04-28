describe('Controllers', function(){
    var scope, location, state, stateParams;

    // load the controller's module
    beforeEach(module('app'));
    beforeEach(module('app.controllers'));
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

        it('Unit test: userName should be defined', function(){
           expect(scope.userName).toBeDefined();
        });

        it('Unit test: Back should not change url if view on home',function(){
            location.path('/menu/home/').replace();
            scope.back();
            expect(location.path()).toEqual('/menu/home');
        });

        it('Unit test: Back should change url if view not on home',function(){
            location.path('/menu/home/N104').replace();
            scope.back();
            expect(location.path()).toEqual('/menu/home');
        });


        // Under development ;)
        it('Unit test: MenuClick should not change state if click on same', function(){
            var dest = 'menu.home'
            scope.menuClick(dest);
            //console.log(state.current.name)
            expect(true);
        })
    })
    
    describe('PalletsCtrl', function(){
        
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            stateParams = {};
            stateParams.dispatchId = 5;
            $controller('PalletsCtrl', {
                $scope: scope,
                $stateParams: stateParams
            });
           
            
        }));
        
        // ==== Tests start here =====


        // Unit tests:
        it('Unit test: message should be set',function(){
            expect(scope.message).toEqual(5);
        });
        
        it('Unit test: ', function(){
            
        });
 

    })
    
     describe('HomeCtrl', function(){
        
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('PalletsCtrl', {
                $scope: scope,
            });
       
        // ==== Tests start here =====

        // Unit tests:
        it('',function(){
        });
});