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
    return items.filter(function(element, index, array) {
        console.log(element);
      return element[type.value].indexOf(text) != -1;
    });
    
  };
})
})()