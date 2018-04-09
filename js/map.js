'use strict';

var PROPERTIES_AMOUNT = 8;
var HOTEL_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOTEL_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var HOTEL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

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

var locationX = getRandomInt(300, 900);
var locationY = getRandomInt(150, 500);

for (var i = 0; i < PROPERTIES_AMOUNT; i++) {
  var similarProperty = {
    author: {
      avatar: 'img/avatars/user' + AVATAR_NUMBERS.splice(getRandomInt(0, AVATAR_NUMBERS.length - 1), 1) + '.png'
    },

    offer: {
      title: HOTEL_TITLE.splice(getRandomInt(0, HOTEL_TITLE.length - 1), 1),
      address: locationX.toString() + ', ' + locationY.toString(),
      price: getRandomInt(1000, 1000000),
      type: getRandomElement(HOTEL_TYPE),
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


var pinElement = mapCardPinTemplate.cloneNode(true);
var mapCardElement = mapCardTemplate.cloneNode(true);

pinElement.style.left = similarProperties[0].location.x + 'px';
pinElement.style.top = similarProperties[0].location.y + 'px';
pinElement.querySelector('img').src = similarProperties[0].author.avatar;
console.log(similarProperties[0].offer.title);
pinElement.querySelector('img').alt = similarProperties[0].offer.title;

mapPinsList.appendChild(pinElement);

mapCardElement.querySelector('.popup__title').textContent = similarProperties[0].offer.title;
mapCardElement.querySelector('.popup__text--address').textContent = similarProperties[0].offer.address;

userDialog.insertBefore(mapCardElement, mapFilters);

