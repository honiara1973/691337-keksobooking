'use strict';
(function () {
  var PROPERTIES_AMOUNT = 8;
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

  var similarProperties = [];

  for (var i = 0; i < PROPERTIES_AMOUNT; i++) {
    var locationX = window.util.getRandomInt(300, 900);
    var locationY = window.util.getRandomInt(150, 500);
    var similarProperty = {
      author: {
        avatar: 'img/avatars/user' + AVATAR_NUMBERS.splice(window.util.getRandomInt(0, AVATAR_NUMBERS.length - 1), 1) + '.png'
      },

      offer: {
        title: HOTEL_TITLE.splice(window.util.getRandomInt(0, HOTEL_TITLE.length - 1), 1),
        address: locationX.toString() + ', ' + locationY.toString(),
        price: window.util.getRandomInt(1000, 1000000),
        type: window.util.getRandomElement(HOTEL_TYPE, window.util.getRandomInt)[1],
        rooms: window.util.getRandomInt(1, 5),
        guests: window.util.getRandomInt(1, 10),
        checkin: window.util.getRandomElement(HOTEL_CHECKIN_TIME, window.util.getRandomInt),
        checkout: window.util.getRandomElement(HOTEL_CHECKOUT_TIME, window.util.getRandomInt),
        features: HOTEL_FEATURES.slice(0, window.util.getRandomInt(1, HOTEL_FEATURES.length)),
        description: '',
        photos: HOTEL_PHOTOS.sort(window.util.compareRandom)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    similarProperties.push(similarProperty);
  }

  window.similarProperties = similarProperties;

})();
