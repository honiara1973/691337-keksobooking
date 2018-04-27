'use strict';

(function () {

  var MAX_GUESTS_PER_ROOM = 1;


  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var successMessage = document.querySelector('.success');
  var elementClassDisabled = 'ad-form__element--disabled';
  var userPropertyAddress = adForm.querySelector('#address');
  var userPropertyType = adForm.querySelector('#type');
  var userPropertyPrice = adForm.querySelector('#price');
  var userPropertyTimein = adForm.querySelector('#timein');
  var userPropertyTimeout = adForm.querySelector('#timeout');
  var userPropertyRoomNumber = adForm.querySelector('#room_number');
  var userPropertyCapacity = adForm.querySelector('#capacity');

  var userPropertyMinPrice = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};


  window.formData = {
    adForm: adForm,
    adFormFieldset: adFormFieldset,
    elementClassDisabled: elementClassDisabled,
    setPinMainAddress: function (left, top, width, height) {
      userPropertyAddress.value = (left + width / 2) + ', ' + (top + height);
    }
  };

  window.util.setElementDisabled(adFormFieldset, elementClassDisabled);

  userPropertyAddress.disabled = true;

  userPropertyType.addEventListener('change', function (evt) {
    var typeOption = evt.target;
    typeOption.selected = 'true';

    userPropertyPrice.placeholder = userPropertyMinPrice[typeOption.value];
    userPropertyPrice.min = userPropertyMinPrice[typeOption.value];

  });

  userPropertyTimein.addEventListener('change', function (evt) {
    var timeinOption = evt.target;
    timeinOption.selected = 'true';

    getDependentOption(timeinOption, userPropertyTimeout);
  });

  userPropertyTimeout.addEventListener('change', function (evt) {
    var timeoutOption = evt.target;
    timeoutOption.selected = 'true';

    getDependentOption(timeoutOption, userPropertyTimein);

  });

  var getDependentOption = function (option, dependentArray) {

    var valueSelected = option.value;

    for (var i = 0; i < dependentArray.options.length; i++) {
      if (dependentArray.options[i].value === valueSelected) {
        dependentArray.options[i].selected = 'true';
      }
    }
  };

  var roomsCapacityValue = {
    rooms: 0,
    capacity: 0
  };

  userPropertyRoomNumber.addEventListener('change', function (evt) {
    var roomOption = evt.target;
    roomOption.selected = true;
    roomsCapacityValue.rooms = roomOption.value;

    var differentValue = userPropertyCapacity.querySelector('option[value=\'0\']');

    getDependentOption(roomOption, userPropertyCapacity);

    if (roomOption.value === '100') {
      differentValue.selected = 'true';
    }

    userPropertyCapacity.setCustomValidity('');

  });

  userPropertyCapacity.addEventListener('change', function (evt) {
    var capacityOption = evt.target;
    capacityOption.selected = true;
    roomsCapacityValue.capacity = capacityOption.value;

    setGuestsValidity(userPropertyCapacity);

  });

  var setGuestsValidity = function (field) {

    if ((roomsCapacityValue.capacity / roomsCapacityValue.rooms) > MAX_GUESTS_PER_ROOM) {
      field.setCustomValidity('Количество гостей превышает максимально возможное. \nКоличество комнат должно быть не меньше '
    + (roomsCapacityValue.capacity / MAX_GUESTS_PER_ROOM) + '.');

    } else if (roomsCapacityValue.capacity === '0' && roomsCapacityValue.rooms !== '100') {
      field.setCustomValidity('Выберите вариант: 100 комнат.');
    } else if (roomsCapacityValue.capacity !== '0' && roomsCapacityValue.rooms === '100') {
      field.setCustomValidity('100 комнат - не для гостей');
    } else {
      field.setCustomValidity('');
    }

  };

  adFormReset.addEventListener('click', function () {
    window.mapData.restoreOriginalState();
  });


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

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      window.mapData.restoreOriginalState();
      successMessage.classList.remove('hidden');
    }, errorHandler);
    evt.preventDefault();

  });

})();
