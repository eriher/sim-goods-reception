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
    .filter('groupByMonthYear', function($parse) {
    var dividers = {};

    return function(input) {
        if (!input || !input.length) return;

        var output = [], 
            previousDate, 
            currentDate;

        for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
            currentDate = moment(item.date);
            if (!previousDate ||
                currentDate.month() != previousDate.month() ||
                currentDate.year() != previousDate.year()) {

                var dividerId = currentDate.format('MMYYYY');

                if (!dividers[dividerId]) {
                    dividers[dividerId] = {
                        isDivider: true,
                        divider: currentDate.format('MMMM YYYY') 
                    };
                }

                output.push(dividers[dividerId]);               
            }

            output.push(item);
            previousDate = currentDate;
        }

        return output;
    };
})
})()