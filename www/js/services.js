angular.module('app.services', [])

.factory('MenuService', function(){
    
    var menuItems =
        [{ text: 'Orders', iconClass: 'icon ion-map', link: 'menu'},
         { text: 'History',iconClass: 'icon ion-map', link: 'history'},
         { text: 'About',iconClass: 'icon ion-map', link: 'about'}];
    
    return {
        all: function() {
            return menuItems;
        }
    }
})

.factory('ScanService', function(){
    
        var scan = function(){
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
            console.log(result);

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    }
    
        return { scan : function(){
        return scan;
    }

}
}
);