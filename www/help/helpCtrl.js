(function(){
    angular.module('app.helpCtrl', [])

    .controller('HelpCtrl', function($scope,$http) {
        
        $scope.write = function(){
            
            var user ={'username':'test', 'password':'testsson'};
            
            intel.security.secureStorage.write(    
            function(){alert('success');},
            function(errorObj){alert('fail: code = '+errorObj.code+', message = '+errorObj.message);},
            {'id':'1', 'data': JSON.stringify(user)
            });  
        }
        
        $scope.read = function(){
            intel.security.secureStorage.read(    
            function(instanceID){ 
                alert('success: instanceID = '+instanceID);
                getData(instanceID);
            },
            function(errorObj){ alert('fail: code = '+errorObj.code+', message = '+errorObj.message);},
            {'id':'1'} 
            );
        }
        
        function getData(instanceID){
            intel.security.secureData.getData(    
            function(data){ 
                var user = JSON.parse(data)
                alert('success: user = '+user.username +' '+ user.password);}, 
            function(errorObj){ alert('fail: code = '+errorObj.code+', message = '+errorObj.message);}, 
            instanceID // Valid secure data instance ID
            );
        }
    })
}())