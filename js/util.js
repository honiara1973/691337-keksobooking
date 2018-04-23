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
    },

    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    },

    getRandomElement: function (array, func) {
      return array[func(0, array.length - 1)];
    },

    compareRandom: function () {
      return Math.random() - 0.5;
    }

  };
})();
