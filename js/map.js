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
  var propertyFeatures = document.querySelector('#housing-features');

 // var filteredProperties = properties.slice(0);

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

    /* filters.addEventListener('change', function (evt) {
    var filteredProperties = properties.slice(0);
    console.log(filteredProperties);
    var option = evt.target;
    option.selected = true;
    console.log(option.value);
    });
   */

    var filteredObj = {
     type: '',                   //массив квартир, допустим [1, 2, 5] объекты массива properties
     price: '',                  //массив подходящих цен  [1, 4, 6] объекты массива properties
     rooms: '',
     guests: ''
    };
    
    function inArray(arr) {
      return function(x) {
        return arr.indexOf(x) != -1;
      };
    }

    function filter(arr, func) {
      var result = [];
    
      for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        if (func(val)) {
          result.push(val);
        }
      }
    
      return result;
    }

   propertyType.addEventListener('change', function (evt) {
    var option = evt.target;
    option.selected = true;
    console.log(option.value);

   var getFilteredType = function () {
       switch (option.value) {
        case 'flat': filteredObj.type = properties.filter(function (it) {
          return it.offer.type === 'flat';
        }); break;
        case 'house': filteredObj.type = properties.filter(function (it) {
          return it.offer.type === 'house';
        }); break;
        case 'bungalo': filteredObj.type = properties.filter(function (it) {
          return it.offer.type === 'bungalo';
        }); break;
        case 'any': filteredObj.type = properties.slice(0); break;
      }
      console.log(filteredObj.type);
      return filteredObj.type;
    }();
   
  });
   
  propertyPrice.addEventListener('change', function (evt) {
    var option = evt.target;
    option.selected = true;
    console.log(option.value);

    var getFilteredPrice = function () {
      switch (option.value) {
      case 'middle': filteredObj.price = properties.filter(function (it) {
        return it.offer.price <= 50000 && it.offer.price >= 10000;
      }); break;
      case 'low': filteredObj.price = properties.filter(function (it) {
        return it.offer.price <= 10000;
      }); break;
      case 'high': filteredObj.price = properties.filter(function (it) {
        return it.offer.price >= 50000;
      }); break;
      case 'any': filteredObj.price = properties.slice(0); break;
    }
   console.log(filteredObj.price); 
   return filteredObj.price;
  }();
  });

     
/*
  propertyType.addEventListener('change', function (evt) {
    var option = evt.target;
    option.selected = true;

    switch (option.value) {
      case 'flat': filteredProperties = properties.filter(function (it) {
        return it.offer.type === 'flat';
      }); break;
      case 'house': filteredProperties = properties.filter(function (it) {
        return it.offer.type === 'house';
      }); break;
      case 'bungalo': filteredProperties = properties.filter(function (it) {
        return it.offer.type === 'bungalo';
      }); break;
      case 'any': filteredProperties = properties.slice(0); break;
    }

    createPins(filteredProperties);
  });

  propertyPrice.addEventListener('change', function (evt) {
    var option = evt.target;
    option.selected = true;

    switch (option.value) {
      case 'middle': filteredProperties = properties.filter(function (it) {
        return it.offer.price <= 50000 && it.offer.price >= 10000;
      }); break;
      case 'low': filteredProperties = properties.filter(function (it) {
        return it.offer.price <= 10000;
      }); break;
      case 'high': filteredProperties = properties.filter(function (it) {
        return it.offer.price >= 50000;
      }); break;
      case 'any': filteredProperties = properties.slice(0); break;
    }

    createPins(filteredProperties);
  });

  propertyRoomNumber.addEventListener('change', function (evt) {
    var option = evt.target;
    option.selected = true;

    filteredProperties = properties.filter(function (it) {
      return it.offer.rooms === parseInt(option.value, 10);
    });

    createPins(filteredProperties);
  });

  propertyCapacity.addEventListener('change', function (evt) {
    var option = evt.target;
    option.selected = true;

    filteredProperties = properties.filter(function (it) {
      return it.offer.guests === parseInt(option.value, 10);
    });

    createPins(filteredProperties);
  });
  


   
   propertyFeatures.addEventListener('click', function (evt) {
    var filteredProperties = properties.slice(0);
    var option = evt.target;
    console.log(option.value);
   
  });

    /* filteredProperties = properties.filter(function (it) {
        if (it.offer.features.indexOf(option.value) >= 0) {
        return it.offer.features; //выдает энное количество раз полный массив пропертиес.
      }
      console.log(filteredProperties.length);
      createPins(filteredProperties);
    });
  */  

/*
   filteredProperties = properties.filter(function (it) {
      if (it.offer.features.indexOf)
        if (properties.offer.features[i] === feature.value) {
          properties.offer.features = it.offer.features;
        }
      }
      return it.offer.features;
    });
 
*/

  var loadHandler = function (data) {
    properties = data;
    createPins(properties);
    console.log(properties);
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
