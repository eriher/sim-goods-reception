describe('app', function(){
    var scope, translate, controller, service, mockedFactory;

    // load the controller's module
    beforeEach(module('app'));
    beforeEach(module('app.translate'));
    beforeEach(module('app.services'));

    
   describe('MenuCtrl', function(){

        beforeEach(inject(function($rootScope, $controller, Menu) {
            scope = $rootScope.$new();
            $controller('MenuCtrl', {$scope: scope});
            service = Menu;
            
            spyOn(Menu,'items').andCallThrough();
        }));

        // ==== Tests start here =====


        // Unit tests:
       
        it('Unit test: menuItems should be defined',function(){
            expect(scope.menuItems).toBeDefined();
        }); 
       
        it('Unit test: menuItems should be 5',function(){
            expect(scope.menuItems.length).toBe(5);
        }); 
 
        it('Unit test: test toBe',function(){
            expect(scope.me).toBe(5);
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
            $controller('AboutCtrl', {
                $scope: scope 
                                     });
        }));
       
        // ==== Tests start here =====

            // Unit tests:
       
        it('Unit test: Test toBe',function(){
            expect(scope.me).toBe(5);
        }); 
       
       //Still needs some work
        it('Unit test: Test language',function(){
            expect(scope.changeLanguage).toBeDefined();
            
        });  
   })
        describe('SigninCtrl', function(){

            beforeEach(inject(function($rootScope, $controller) {
                scope = $rootScope.$new();
                $controller('SigninCtrl', {$scope: scope});
            }));

            // ==== Tests start here =====


            // Unit tests:
            it('Unit test: test toBe',function(){
                expect(scope.me).toBe(5);
            });
            it('Unit test: test toBe',function(){
                expect(scope.signIn).toBeDefined;
            }); 
            
            // Integration Tests
            
            it('Integration test: Login should be called in signin.js', function(){
                
            })
    })
});