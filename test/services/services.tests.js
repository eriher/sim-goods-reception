describe("Services", function(){

    beforeEach(module("app.services"));

    var service,$httpBackend;

    describe("SigninService", function(){
        beforeEach(inject(function(SigninService, _$httpBackend_){
            service = SigninService;
            $httpBackend = _$httpBackend_;
        }));

    

        it("test login", function(){
            $httpBackend.whenGET('https://login').respond([{id:1, name: "test"}]);
            
            service.login('user','name');
            expect(service.getInfo()).toBeDefined();
        });
    })

    describe("MenuService", function(){
        beforeEach(inject(function(MenuService, _$httpBackend_){
            service = MenuService;
            $httpBackend = _$httpBackend_;
        }));
        
        it("Should be 5 items in SideMenu", function(){
            
            expect((service.items()).length).toBe(5);
        })


    });

});