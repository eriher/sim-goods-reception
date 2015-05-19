describe("Services", function(){

    beforeEach(module("app.services"));
    beforeEach(module("ngMockE2E"));
    
    var service,httpBackend;

    describe("Network", function(){
        beforeEach(inject(function(Network, $httpBackend, $http){
            service = Network;
            httpBackend = $httpBackend;
            http = $http;
        }));
        
        
        it("expect authorizationToken to equal token",function() {
            var url = 'https://login';
           // httpBackend.expectPOST(url).respond(200 , { authorizationToken: 'token' });
           /* httpBackend.whenPOST('https://login').respond(function(method, url, data) {
                var data = angular.fromJson(data);
                console.log('test')
                if(data.username=='a' && data.password =='a'){
                    return  [200 , { authorizationToken: 'token' } ];
                }
                else{ 
                    return [406];
                } 
            });*/
            
            
            service.login('a','a').then(function(data){
                expect(data.authorizationToken).toEqual(123);
            },
            function(fail){
                console.log("login fail " + fail);
            })
            



        });

    
        it("should make an ajax call to login", function(){
            service.login('a','a');
            httpBackend.expectPOST('https://login')
        });

        it('login should be correct', function(){
            service.login('a','a');

        })
        
    });

    describe("Menu", function(){
        beforeEach(inject(function(Menu){
            service = Menu;
        }));
        
        it("Should be 5 items in SideMenu", function(){
            
            expect((service.items()).length).toBe(5);
        })


    });

});