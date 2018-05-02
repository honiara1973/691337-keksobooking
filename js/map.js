'use strict';

(function () {

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 85;
  var PIN_MAIN_START_COORDS = {x: 570, y: 375};
  var MOVE_LIMIT_TOP = 150;
  var MOVE_LIMIT_BOTTOM = 500;
  var PIN_AMOUNT_MAX = 5;

  var userDialog = document.querySelector('.map');
  var mapPinMain = userDialog.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  var filters = mapFilters.querySelector('.map__filters');
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

  var properties = [];
  var propertyType = document.querySelector('#housing-type');
  var propertyPrice = document.querySelector('#housing-price');
  var propertyRoomNumber = document.querySelector('#housing-rooms');
  var propertyCapacity = document.querySelector('#housing-guests');
  var propertyFeatures = document.querySelectorAll('.map__features input');

  var removePins = function () {
    var pins = mapPinsList.querySelectorAll('.map__pin');

    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapPinsList.removeChild(pins[i]);
      }
    }
  };

  var removePopup = function () {
    var mapCardPopup = document.querySelectorAll('.popup');
    for (var j = 0; j < mapCardPopup.length; j++) {
      userDialog.removeChild(mapCardPopup[j]);
    }
  };

  var createPins = function (array) {

    removePins();
    removePopup();

    var arraySliced = array.slice(0, PIN_AMOUNT_MAX);

    var fragmentPinElement = document.createDocumentFragment();

    for (var j = 0; j < arraySliced.length; j++) {
      fragmentPinElement.appendChild(window.renderPinElement(array[j]));
    }
    mapPinsList.appendChild(fragmentPinElement);
    return mapPinsList;
  };

  filters.addEventListener('change', function () {
    var filteredProperties = properties.slice(0);

    switch (propertyType.value) {
      case 'flat':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.type === 'flat';
        });
        break;
      case 'house':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.type === 'house';
        });
        break;
      case 'bungalo':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.type === 'bungalo';
        });
        break;
    }

    switch (propertyPrice.value) {
      case 'middle':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price <= 50000 && it.offer.price >= 10000;
        });
        break;
      case 'low':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price <= 10000;
        });
        break;
      case 'high':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price >= 50000;
        });
        break;
    }

    switch (propertyRoomNumber.value) {
      case '1':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === 1;
        });
        break;
      case '2':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === 2;
        });
        break;
      case '3':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === 3;
        });
        break;
    }

    switch (propertyCapacity.value) {
      case '1':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.guests === 1;
        });
        break;
      case '2':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.guests === 2;
        });
        break;
    }

    for (var i = 0; i < propertyFeatures.length; i++) {

      if (propertyFeatures[i].checked) {
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.features.indexOf(propertyFeatures[i].value) >= 0;
        });
      }
    }

    createPins(filteredProperties);
  });

  var loadHandler = function (data) {
    properties = data;
    createPins(properties);
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
    mapPinsList: mapPinsList,

    restoreOriginalState: function () {
      userDialog.classList.add('map--faded');
      window.formData.adForm.classList.add('ad-form--disabled');
      window.util.setElementDisabled(window.formData.adFormFieldset, window.formData.elementClassDisabled);
      pinMainPosLeft = PIN_MAIN_START_COORDS.x;
      pinMainPosTop = PIN_MAIN_START_COORDS.y;
      mapPinMain.style.left = pinMainPosLeft + 'px';
      mapPinMain.style.top = pinMainPosTop + 'px';
      removePins();
      removePopup();
    }
  };

})();
