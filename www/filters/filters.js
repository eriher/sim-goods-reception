(function(){
    angular.module('app.filters', [])

        .filter('searchFilter', function() {
  return function(items, text, type) {
      
    if (!text) {
      return items;
    }
    
    if (!text || '' === text) {
      return items;
    }
     
    if (!type || '' === type.value) {
      return items;
    }
      
    console.log(type);
    return items.filter(function(element, index, array) {
      return element[type.value].indexOf(text) != -1;
    });
    
  };
})
})()