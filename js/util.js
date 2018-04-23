'use strict';

window.util = (function () {
 
  return {
    setElementDisabled: function (array, elClass) {
      for (var i = 0; i < array.length; i++) {
        array[i].classList.add(elClass);
        array[i].disabled = true;
      }
      return array;
    },
    
    setElementEnabled: function (array, elClass) {
      for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(elClass);
        array[i].disabled = false;
      }
      return array;
    }
    
  };
})();