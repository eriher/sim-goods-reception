angular.module('app.services', [])

.factory('MenuService', function(){
    
    var menuItems =
        [{ text: 'Ordrar', iconClass: 'icon ion-map', link: 'menu'},
         { text: 'Historik',iconClass: 'icon ion-map', link: 'history'},
         { text: 'Om SIM-app',iconClass: 'icon ion-map', link: 'about'}];
    
    return {
        all: function() {
            return menuItems;
        }
    }
});