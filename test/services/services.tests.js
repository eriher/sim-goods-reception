describe("Services", function(){

    beforeEach(module("app.services"));
    beforeEach(module("ngMockE2E"));
    
    var token = "authToken";
    var data = "syncData";
    var service, httpBackend, http;

    describe("Network", function(){
        beforeEach(inject(function(Network, $httpBackend, $http){
            service = Network;
            httpBackend = $httpBackend;
            http = $http;

        }));    

        it('login: Should fetch a token', function(done) {
            var testToken = function(success) {
              expect(success[0].Token).toBe(token);
            };
            var failTest = function(error) {
              expect(error).toBeUndefined();
            };

            httpBackend.expectGET('http://sim.apper.se/WCF.Sandbox/Test.svc/REST/Test/login?Password=Olof&username=Erik').respond([{Token: token}]);
        
            service.login('Erik', 'Olof')
            .then(testToken)
            .catch(failTest)
            .finally(done)

            httpBackend.flush();
    
        });
        
        it('login: Should not fetch a token', function(done) {
            var testToken = function(success) {
              expect(success[0].Token).toBe(null);
            };
            var failTest = function(error) {
              expect(error).toBeUndefined();
            };

            httpBackend.expectGET('http://sim.apper.se/WCF.Sandbox/Test.svc/REST/Test/login?Password=Admin&username=Admin').respond([{Token: null}]);
        
            service.login('Admin', 'Admin')
            .then(testToken)
            .catch(failTest)
            .finally(done)

            httpBackend.flush();
    
        });
        
        it('dbTestData: Should fetch item', function(done) {
            window.localStorage.setItem("customerIDS", '["12323"]');   
            var testData = function(success) {
              expect(success[0].data[0].item).toBe(data);
            };

            var failTest = function(error) {
              expect(error).toBeUndefined();
            };

            httpBackend.expectGET('http://sim.apper.se//wcf.sandbox/Test.svc/REST/Test/getDispatchInfo?customerID=12323').respond([{item: data}]);
        
            service.dbTestData(1)
            .then(testData)
            .catch(failTest)
            .finally(done)

            httpBackend.flush();
        });
        
        it('dbTestData: Should not fetch data', function(done) {
            window.localStorage.setItem("customerIDS", '["12323"]');
            
            var testData = function(success) {
              expect(success[0].data[0].item).toBe(null);
            };

            var failTest = function(error) {
              expect(error).toBeUndefined();
            };

            httpBackend.expectGET('http://sim.apper.se//wcf.sandbox/Test.svc/REST/Test/getDispatchInfo?customerID=12323').respond([{item: null}]);
        
            service.dbTestData(4001)
            .then(testData)
            .catch(failTest)
            .finally(done)

            httpBackend.flush();
        }); 
    });

    describe("Menu", function(){
        beforeEach(inject(function(Menu){
            service = Menu;
        }));

        it("Should be 5 items in SideMenu", function(){
            expect((service.items()).length).toBe(5);
        })


    });
    
    describe("DataStorage", function(){
        beforeEach(inject(function(DataStorage){
            service = DataStorage;
        }));

        it("DataStorage: Should return data", function(){
            expect(service.getData()).toBeDefined;
        })


    });
    
    //Comment Intel Security API in signin.js for this to work
    describe("Signin", function(){
        beforeEach(inject(function(Signin, $httpBackend){
            service = Signin;
            httpBackend = $httpBackend;
        }));

        it("login: Should return data", function(){
            expect(service.login()).toBeDefined;
        })
        
        it("login: All tests for login", function(done){

                        
            var userTest = function(success) {
                var user = service.user();
                var isAuth = service.isAuthenticated();
                var token = window.localStorage['token']
                var loggedIn = window.localStorage['loggedIn'];
                
                
                expect(user.username).toBe('Erik');
                expect(user.password).toBe('Olof');
                expect(isAuth);
                expect(token).toBe('authToken')
                expect(loggedIn).toBe('true')
            };
            var failTest = function(error) {
                expect(error).toBeUndefined();
            };
            
            httpBackend.expectGET('http://sim.apper.se/WCF.Sandbox/Test.svc/REST/Test/login?Password=Olof&username=Erik').respond([{Token: token}]);
            
            var username = "Erik";
            var password = "Olof";
            service.login(username, password)
                .then(userTest)
                .catch(failTest)
                .finally(done);
            
            httpBackend.flush();
        })
        
        it("logout: All test for logout", function(){
            service.logout();
            var token = window.localStorage['token'];
            
            expect(token).toBeUndefined();
        })
        
    });

});