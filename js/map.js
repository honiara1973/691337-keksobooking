'use strict';

(function () {

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 85;
  var PIN_MAIN_START_COORDS = {x: 570, y: 375};
  var MOVE_LIMIT_TOP = 150;
  var MOVE_LIMIT_BOTTOM = 500;

  var userDialog = document.querySelector('.map');
  var mapPinMain = userDialog.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  var pinMainPosLeft = mapPinMain.offsetLeft;
  var pinMainPosTop = mapPinMain.offsetTop;


  var onPinMainClick = function () {
    userDialog.classList.remove('map--faded');
    window.formData.adForm.classList.remove('ad-form--disabled');
    window.util.setElementEnabled(window.formData.adFormFieldset, window.formData.elementClassDisabled);
  };

  var moveLimits = {
    top: userDialog.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_TOP,
    left: userDialog.offsetLeft - PIN_MAIN_WIDTH / 2,
    bottom: userDialog.offsetTop - PIN_MAIN_HEIGHT + MOVE_LIMIT_BOTTOM,
    right: userDialog.offsetLeft - PIN_MAIN_WIDTH + userDialog.offsetWidth
  };

  mapPinMain.addEventListener('mousedown', function (evt) {

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

      pinMainPosLeft = mapPinMain.offsetLeft - shift.x;
      pinMainPosTop = mapPinMain.offsetTop - shift.y;

      pinMainPosLeft = Math.max(pinMainPosLeft, moveLimits.left);
      pinMainPosLeft = Math.min(pinMainPosLeft, moveLimits.right);
      mapPinMain.style.left = pinMainPosLeft + 'px';

      pinMainPosTop = Math.max(pinMainPosTop, moveLimits.top);
      pinMainPosTop = Math.min(pinMainPosTop, moveLimits.bottom);
      mapPinMain.style.top = pinMainPosTop + 'px';


      window.formData.setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onPinMainClick();
      window.formData.setPinMainAddress(pinMainPosLeft, pinMainPosTop, PIN_MAIN_WIDTH, PIN_MAIN_HEIGHT);
      window.backend.load(loadHandler, errorHandler);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var loadHandler = function (similarProperties) {
    console.log('Data loaded');
    var fragmentPinElement = document.createDocumentFragment();

    for (var i = 0; i < 8; i++) {
      fragmentPinElement.appendChild(window.renderPinElement(similarProperties[i]));
    }
    mapPinsList.appendChild(fragmentPinElement);
    return mapPinsList;
  };

  var errorHandler = function (errorMessage) {
    var errorElement = document.createElement('div');

    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orange;';
    errorElement.style.position = 'fixed';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);

  };

  window.mapData = {
    userDialog: userDialog,
    mapFilters: mapFilters,
    mapPinMain: mapPinMain,

    restoreOriginalState: function () {
      pinMainPosLeft = PIN_MAIN_START_COORDS.x;
      pinMainPosTop = PIN_MAIN_START_COORDS.y;
      mapPinMain.style.left = pinMainPosLeft + 'px';
      mapPinMain.style.top = pinMainPosTop + 'px';

      var pins = mapPinsList.querySelectorAll('.map__pin');
      for (var i = 1; i < pins.length; i++) {
        mapPinsList.removeChild(pins[i]);
      }

    }
  };


})();
