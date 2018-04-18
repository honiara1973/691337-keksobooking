'use strict';

var PROPERTIES_AMOUNT = 8;
var MAX_GUESTS_PER_ROOM = 1;
var HOTEL_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOTEL_TYPE = [['palace', 'Дворец'], ['flat', 'Квартира'], ['house', 'Дом'], ['bungalo', 'Бунгало']];
var HOTEL_FEATURES = [['wifi', 'popup__feature--wifi'], ['dishwasher', 'popup__feature--dishwasher'],
  ['parking', 'popup__feature--parking'], ['washer', 'popup__feature--washer'], ['elevator', 'popup__feature--elevator'],
  ['conditioner', 'popup__feature--conditioner']];
var HOTEL_CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var userPropertyMinPrice = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};
var guestsForRooms = {1: [1], 2: [1, 2], 3: [1, 2, 3], 100: [0]};


var userDialog = document.querySelector('.map');
var mapPinMain = userDialog.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var elementClassDisabled = 'ad-form__element--disabled';
var userPropertyAddress = adForm.querySelector('#address');
var userPropertyType = adForm.querySelector('#type');
var userPropertyPrice = adForm.querySelector('#price');
var userPropertyTimein = adForm.querySelector('#timein');
var userPropertyTimeout = adForm.querySelector('#timeout');
var userPropertyRoomNumber = adForm.querySelector('#room_number');
var userPropertyCapacity = adForm.querySelector('#capacity');

var setElementDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.add(elementClassDisabled);
    array[i].disabled = true;
  }
  return array;
};

setElementDisabled(adFormFieldset);

var setElementEnabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(elementClassDisabled);
    array[i].disabled = false;
  }
  return array;
};

var setPinMainAddress = function () {
  userPropertyAddress.disabled = true;
  userPropertyAddress.value = mapPinMain.style.left.slice(0, -2) + ', ' + mapPinMain.style.top.slice(0, -2);
};

var onPinMainClick = function () {
  userDialog.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setElementEnabled(adFormFieldset);
};

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

var obj = {
  rooms: 0,
  capacity: 0
};

userPropertyRoomNumber.addEventListener('change', function (evt) {
  var roomOption = evt.target;
  roomOption.selected = true;
  obj.rooms = roomOption.value;
  console.log(obj.rooms);

  var differentValue = userPropertyCapacity.querySelector('option[value=\'0\']');

  getDependentOption(roomOption, userPropertyCapacity);

  if (roomOption.value === '100') {
    differentValue.selected = 'true';
  }

});

userPropertyCapacity.addEventListener('change', function (evt) {
  var capacityOption = evt.target;
  capacityOption.selected = true;
  var differentValue = userPropertyRoomNumber.querySelector('option[value=\'100\']');

  var valueSelected = capacityOption.value;

  obj.capacity = capacityOption.value;
  console.log(obj.capacity);

  if (capacityOption.value === '0') {
    differentValue.selected = 'true';
  }

  if ((valueSelected / obj.rooms) > MAX_GUESTS_PER_ROOM) {
    capacityOption.setCustomValidity('Количество гостей превышает максимально возможное. \nКоличество комнат должно быть не меньше '
      + (valueSelected / MAX_GUESTS_PER_ROOM) + '.');

  } else if (valueSelected === '0' && obj.rooms !== '100') {
    capacityOption.setCustomValidity('Вам подходит вариант: 100 комнат. Кол-во комнат было изменено.');
  } else if (valueSelected !== '0' && obj.rooms === '100') {
    capacityOption.setCustomValidity('100 комнат - не для гостей');
  } else {
    capacityOption.setCustomValidity('');
  }
});

var similarProperties = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getRandomElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

for (var i = 0; i < PROPERTIES_AMOUNT; i++) {
  var locationX = getRandomInt(300, 900);
  var locationY = getRandomInt(150, 500);
  var similarProperty = {
    author: {
      avatar: 'img/avatars/user' + AVATAR_NUMBERS.splice(getRandomInt(0, AVATAR_NUMBERS.length - 1), 1) + '.png'
    },

    offer: {
      title: HOTEL_TITLE.splice(getRandomInt(0, HOTEL_TITLE.length - 1), 1),
      address: locationX.toString() + ', ' + locationY.toString(),
      price: getRandomInt(1000, 1000000),
      type: getRandomElement(HOTEL_TYPE)[1],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomElement(HOTEL_CHECKIN_TIME),
      checkout: getRandomElement(HOTEL_CHECKOUT_TIME),
      features: HOTEL_FEATURES.slice(0, getRandomInt(1, HOTEL_FEATURES.length)),
      description: '',
      photos: HOTEL_PHOTOS.sort(compareRandom)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  similarProperties.push(similarProperty);
}

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCardPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapPinsList = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');
var pinWidth = mapCardPinTemplate.querySelector('img').width;
var pinHeight = mapCardPinTemplate.querySelector('img').height;

var renderPinElement = function (data) {
  var pinElement = mapCardPinTemplate.cloneNode(true);
  pinElement.style.left = (data.location.x - pinWidth / 2) + 'px';
  pinElement.style.top = (data.location.y - pinHeight) + 'px';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  pinElement.addEventListener('click', function () {
    var fragmentCardElement = document.createDocumentFragment();
    fragmentCardElement.appendChild(renderCardElement(data));
    userDialog.insertBefore(fragmentCardElement, mapFilters);
  });

  return pinElement;
};

mapPinMain.addEventListener('mouseup', function () {
  onPinMainClick();
  setPinMainAddress();
  createSimilarPropertiesPins();
});

var renderCardElement = function (data) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.querySelector('.popup__title').textContent = data.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = data.offer.type;
  mapCardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты'
 + ' для ' + data.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin +
', выезд до ' + data.offer.checkout;

  var mapCardFeatures = mapCardElement.querySelector('.popup__features');

  var getMapCardFeatures = function () {

    for (var j = 0; j < data.offer.features.length; j++) {
      var mapCardFeature = document.createElement('li');
      mapCardFeature.classList.add(data.offer.features[j][1]);
      mapCardFeature.classList.add('popup__feature');
      mapCardFeatures.appendChild(mapCardFeature);
    }
    return mapCardFeatures;
  };

  mapCardFeatures = getMapCardFeatures();

  mapCardElement.querySelector('.popup__description').textContent = data.offer.description;

  var mapCardPhotos = mapCardElement.querySelector('.popup__photos');

  var getMapCardPhotos = function () {
    for (var j = 0; j < data.offer.photos.length; j++) {
      var mapCardPhoto = document.createElement('img');
      mapCardPhoto.classList.add('popup__photo');
      mapCardPhoto.src = data.offer.photos[j];
      mapCardPhoto.width = '45';
      mapCardPhoto.height = '40';
      mapCardPhoto.alt = 'Фотография жилья';
      mapCardPhotos.appendChild(mapCardPhoto);
    }
    return mapCardPhotos;
  };

  mapCardPhotos = getMapCardPhotos();

  mapCardElement.querySelector('.popup__avatar').src = data.author.avatar;

  return mapCardElement;
};

var createSimilarPropertiesPins = function () {
  var fragmentPinElement = document.createDocumentFragment();

  for (i = 0; i < similarProperties.length; i++) {
    fragmentPinElement.appendChild(renderPinElement(similarProperties[i]));
  }
  mapPinsList.appendChild(fragmentPinElement);
  return mapPinsList;
};

