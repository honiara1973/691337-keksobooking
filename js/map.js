'use strict';

(function () {

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 85;
  var PIN_MAIN_START_COORDS = {x: 570, y: 375};
  var MOVE_LIMIT_TOP = 150;
  var MOVE_LIMIT_BOTTOM = 500;
  
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var pinMainPosLeft = pinMain.offsetLeft;
  var pinMainPosTop = pinMain.offsetTop;

  var onPinMainClick = function () {
    map.classList.remove('map--faded');
    window.formData.adForm.classList.remove('ad-form--disabled');
    window.util.setElementEnabled(window.formData.adFormFieldset, window.formData.elementClassDisabled);
  };

  var moveLimits = {
    top: map.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_TOP,
    left: map.offsetLeft - PIN_MAIN_WIDTH / 2,
    bottom: map.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_BOTTOM,
    right: map.offsetLeft - PIN_MAIN_WIDTH + map.offsetWidth
  };

  pinMain.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMainPosLeft = pinMain.offsetLeft - shift.x;
      pinMainPosTop = pinMain.offsetTop - shift.y;

      pinMainPosLeft = Math.max(pinMainPosLeft, moveLimits.left);
      pinMainPosLeft = Math.min(pinMainPosLeft, moveLimits.right);
      pinMain.style.left = pinMainPosLeft + 'px';

      pinMainPosTop = Math.max(pinMainPosTop, moveLimits.top);
      pinMainPosTop = Math.min(pinMainPosTop, moveLimits.bottom);
      pinMain.style.top = pinMainPosTop + 'px';

      window.formData.setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onPinMainClick();
      window.formData.setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
      window.backend.load(onSuccessLoad, window.util.onErrorLoad);
      window.removeFilters();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var onSuccessLoad = function (data) {
    window.mapData.properties = data;
    window.util.createPins(window.mapData.properties);
  };
  
  window.mapData = {
    map: map,
    properties: [],

    restoreOriginalState: function () {
      map.classList.add('map--faded');
      window.formData.adForm.classList.add('ad-form--disabled');
      window.util.setElementDisabled(window.formData.adFormFieldset, window.formData.elementClassDisabled);
      pinMainPosLeft = PIN_MAIN_START_COORDS.x;
      pinMainPosTop = PIN_MAIN_START_COORDS.y;
      pinMain.style.left = pinMainPosLeft + 'px';
      pinMain.style.top = pinMainPosTop + 'px';
      window.util.removePins();
      window.util.removePopup();
    }
  };

})();
