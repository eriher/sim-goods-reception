/*
    Tests for controllers
*/
describe('app', function(){
    var scope, translate, controller, service, httpBackend, someServiceMock;

    // load the controller's module
    beforeEach(module('app'));
    beforeEach(module('app.translate'));
    beforeEach(module('app.services'));

    
   describe('MenuCtrl', function(){

        beforeEach(inject(function($rootScope, $controller, Menu) {
            scope = $rootScope.$new();
            controller = $controller('MenuCtrl', {$scope: scope});
            service = Menu;
            
        }));

        // ==== Tests start here =====


        // Unit tests:
       
        it('Unit test: menuItems should be defined',function(){
            expect(scope.menuItems).toBeDefined();
        }); 
       
        it('Unit test: menuItems should be 5',function(){
            expect(scope.menuItems.length).toBe(5);
        }); 
       
        it('Scanbtn should be defined',function(){
            expect(scope.scanBtn).toBeDefined();
        })
        
        it('MenuClick should be defined', function(){
            expect(scope.menuClick).toBeDefined();
        })
        
        //Integration test
        it('Integration test', function(){
           
            //expect(service.items).toHaveBeenCalled();
            
        })
        
        
    })
   describe('AboutCtrl', function(){

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('AboutCtrl', {$scope: scope});
        }));
       
        // ==== Tests start here =====

       //Still needs some work
        it('Unit test: Test language',function(){
            expect(scope.changeLanguage).toBeDefined();
            
        });  
   })
   describe('SigninCtrl', function(){
        beforeEach(inject(function($rootScope, $controller, $q, Signin) {
            scope = $rootScope.$new();
            controller = $controller('SigninCtrl', 
                {$scope: scope, Signin: Signin});
        }));

        // ==== Tests start here =====

        // Unit tests:
        it('Unit test: test signin',function(){
            expect(scope.signIn).toBeDefined;
        }); 

        // Integration Tests
        it('Integration test: test signIn', function(){
            
            var user = {username:'Erik', password:'Olof'}
            scope.signIn(user);
            //expect(someServiceMock.login).toHaveBeenCalled();  
        })
    })
   describe('palletsCtrl', function(){

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            
            //2 is just for testing
            controller = $controller('PalletsCtrl', 
                            {$scope: scope,
                            count: function(){return 2},
                            dispatchCheck:2,
                            palletId:2,
                            dispatch:2});
        }));

        // ==== Tests start here =====

        // Unit tests:
        it('Unit test: test palletId',function(){
            expect(scope.palletId).toBe(2);
        });
   })
});