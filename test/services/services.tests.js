describe("Services", function(){

    beforeEach(module("app.services"));
    beforeEach(module("ngMockE2E"));

    var service,httpBackend;

    describe("SigninService", function(){
        beforeEach(inject(function(SigninService, $httpBackend){
            service = SigninService;
            httpBackend = $httpBackend;
        }));

    
            it("should make an ajax call to login", function(){
                httpBackend.whenPOST("https://login").respond(function(method, url, data){
                     var data = angular.fromJson(data);
        
                    if(data.username == 'admin' && data.password =='admin'){
                        return  [200 , { authorizationToken: token } ];
                    }
                    else{ 
                        return [400];
                    } 
                });
                                                                                                        
                expect(service.login('admin','admin')).toBeDefined();
            });
        
        });

    describe("MenuService", function(){
        beforeEach(inject(function(MenuService){
            service = MenuService;
        }));
        
        it("Should be 5 items in SideMenu", function(){
            
            expect((service.items()).length).toBe(5);
        })


    });

});