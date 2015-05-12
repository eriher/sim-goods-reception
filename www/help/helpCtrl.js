(function(){
    angular.module('app.helpCtrl', [])

    .controller('HelpCtrl', function($scope,$http) {
        var url = "http://sim.apper.se/ServiceApp/SIMService.svc/SIMService";
        var key = "AwAAAAEAAAAUAAAAkLmVq/W1bhxeEK6Ak4hQ8a+VmcwgAAAAAQAAAEoFAAAwggVGMIIELqADAgECAgMHdGwwDQYJKoZIhvcNAQEFBQAwYTELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUdlb1RydXN0IEluYy4xHTAbBgNVBAsTFERvbWFpbiBWYWxpZGF0ZWQgU1NMMRswGQYDVQQDExJHZW9UcnVzdCBEViBTU0wgQ0EwHhcNMTMwOTA1MDA0MzE2WhcNMTUwOTA3MjIwNjA1WjCBwzEpMCcGA1UEBRMgNmFUL0w1SzJxNzBMdUZJRXBWZUtGa0l6RXZHNFE1LXUxEzARBgNVBAsTCkdUNzU1NzM0NzIxMTAvBgNVBAsTKFNlZSB3d3cuZ2VvdHJ1c3QuY29tL3Jlc291cmNlcy9jcHMgKGMpMTMxNzA1BgNVBAsTLkRvbWFpbiBDb250cm9sIFZhbGlkYXRlZCAtIFF1aWNrU1NMKFIpIFByZW1pdW0xFTATBgNVBAMTDHNpbS5hcHBlci5zZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALd40TOnvy8twdv/XHuNSgs8pRF7yH4ujul+/Q1oB/qDDSxr8NmcTtErRHtj4cIOvjy5q752Vk9WYhzEFrfUxp91bg8g2lzgmRci6dIGWe7uDb/wWBw+Z3yw3sEsDrO3zZ9hnR3045ic9VK9hBLROUa+TaYlR89+2ycp7XecoiCFy1v/SM49USZKV6iGGAO6nB0q3/Tz6X2RBHafWc8SbgikPGUHKPx5y7Uqwk5vaPhrrWyKuBNb+JUHUTQWLwlxcEYP42FYM2d9BfzVwYoWvb3VfGH0dE1ldlb5+WNQh9q3klkyplVJU3LQ4otwJE0M4X3Ivgg7Q1/YEWmwz6LLICECAwEAAaOCAaIwggGeMB8GA1UdIwQYMBaAFIz02ZMKR7wAoErOS3VuoLawsn78MA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwFwYDVR0RBBAwDoIMc2ltLmFwcGVyLnNlMEEGA1UdHwQ6MDgwNqA0oDKGMGh0dHA6Ly9ndHNzbGR2LWNybC5nZW90cnVzdC5jb20vY3Jscy9ndHNzbGR2LmNybDAdBgNVHQ4EFgQUzrn2zSxtnTHfhi9a7HTHDbzzfBQwDAYDVR0TAQH/BAIwADB1BggrBgEFBQcBAQRpMGcwLAYIKwYBBQUHMAGGIGh0dHA6Ly9ndHNzbGR2LW9jc3AuZ2VvdHJ1c3QuY29tMDcGCCsGAQUFBzAChitodHRwOi8vZ3Rzc2xkdi1haWEuZ2VvdHJ1c3QuY29tL2d0c3NsZHYuY3J0MEwGA1UdIARFMEMwQQYKYIZIAYb4RQEHNjAzMDEGCCsGAQUFBwIBFiVodHRwOi8vd3d3Lmdlb3RydXN0LmNvbS9yZXNvdXJjZXMvY3BzMA0GCSqGSIb3DQEBBQUAA4IBAQBTLpPloqDKfw66qy1JlAO7yoIaDjamuT4XEbcF+Eiu+kQaRkQk6FRnAijT9mux96uJ1UUEpLK6IBoOTdC22pehZ2K4Q6Vt6e8/a7rWEN6NefldmDXo3M1f79+0JsLewZl6Y/tRXL34xjftQ9KSsG+rl9Is5vIgu/XQR4MDm/WSFd/tYsgtCR/GCnNHuhJilrm5ExCH94z6RrsPvJsKw9/oNxqNvMwSTqSPjTuXA0HCMcptXqC0N+rMQmEoDOace5UnNcxs7W/sZAhEm/q9gTgf9FEv88MLOqcHe/P9tdSILbah2dFSm/hSj5jBJaYCOURkXY38Lc+UiaKLrshArdYB";
        
        $scope.test = function(){
            $http.get("http://sim.apper.se/ServiceApp/SIMService.svc/SimService")
            .success(function(success){
                alert('Success')
                console.log('Success')
            })
            .error(function(data, status, headers, config){
                console.log('fail');
            }) 
        }
    })
}())