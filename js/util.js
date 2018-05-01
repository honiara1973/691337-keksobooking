'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

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
