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
});