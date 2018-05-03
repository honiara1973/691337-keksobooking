'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PIN_AMOUNT_MAX = 5;
  var pinsList = document.querySelector('.map__pins');

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
    },

    onErrorLoad: function (errorMessage) {
      var errorElement = document.createElement('div');

      errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orange;';
      errorElement.style.position = 'fixed';
      errorElement.style.left = 0;
      errorElement.style.right = 0;
      errorElement.style.fontSize = '30px';

      errorElement.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorElement);

      setTimeout(function () {
        document.body.removeChild(errorElement);
      }, 3000);

    },

    removePins: function () {
      var pins = pinsList.querySelectorAll('.map__pin');

      for (var i = 0; i < pins.length; i++) {
        if (!pins[i].classList.contains('map__pin--main')) {
          pinsList.removeChild(pins[i]);
        }
      }
    },

    removePopup: function () {
      var mapCardPopup = document.querySelectorAll('.popup');
      for (var j = 0; j < mapCardPopup.length; j++) {
        window.mapData.map.removeChild(mapCardPopup[j]);
      }
    },

    removeFeaturesChecked: function (list) {
      for (var i = 0; i < list.length; i++) {
        list[i].checked = false;
      }
    },

    addFeatureChecked: function (array) {
      array.addEventListener('keydown', function (evt) {
        var feature = evt.target;
        if (evt.keyCode === ENTER_KEYCODE) {
          feature.checked = true;
        }
      });
    },

    createPins: function (array) {
      window.util.removePins();
      window.util.removePopup();

      var arraySliced = array.slice(0, PIN_AMOUNT_MAX);

      var fragmentPinElement = document.createDocumentFragment();

      for (var j = 0; j < arraySliced.length; j++) {
        fragmentPinElement.appendChild(window.renderPinElement(array[j]));
      }
      pinsList.appendChild(fragmentPinElement);
      return pinsList;
    }
  };
})();
