'use strict';

(function () {

  var PHOTO_SIZE = {width: '45', height: '40'};

  var MAP_CARD_TYPE_RU = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var FEATURE_CLASS_LIST_MAP = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var addMapCardFeatures = function (domNode, features) {

    for (var j = 0; j < features.length; j++) {
      var mapCardFeature = document.createElement('li');
      mapCardFeature.classList.add('popup__feature');
      mapCardFeature.classList.add(FEATURE_CLASS_LIST_MAP[features[j]]);
      mapCardFeature.textContent = FEATURE_CLASS_LIST_MAP[features[j]];
      domNode.appendChild(mapCardFeature);
    }

  };

  var addMapCardPhotos = function (domNode, images) {

    for (var j = 0; j < images.length; j++) {
      var mapCardPhoto = document.createElement('img');
      mapCardPhoto.classList.add('popup__photo');
      mapCardPhoto.src = images[j];
      mapCardPhoto.width = PHOTO_SIZE.width;
      mapCardPhoto.height = PHOTO_SIZE.height;
      mapCardPhoto.alt = 'Фотография жилья';
      domNode.appendChild(mapCardPhoto);
    }

  };

  window.renderCardElement = function (data) {
    var mapCardElement = mapCardTemplate.cloneNode(true);
    mapCardElement.querySelector('.popup__title').textContent = data.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    mapCardElement.querySelector('.popup__type').textContent = MAP_CARD_TYPE_RU[data.offer.type];

    mapCardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты'
+ ' для ' + data.offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin +
', выезд до ' + data.offer.checkout;

    var mapCardFeatures = mapCardElement.querySelector('.popup__features');
    addMapCardFeatures(mapCardFeatures, data.offer.features);

    mapCardElement.querySelector('.popup__description').textContent = data.offer.description;

    var mapCardPhotos = mapCardElement.querySelector('.popup__photos');
    addMapCardPhotos(mapCardPhotos, data.offer.photos);

    mapCardElement.querySelector('.popup__avatar').src = data.author.avatar;

    var closePopup = function () {
      mapCardElement.classList.add('hidden');
    };

    var buttonClose = mapCardElement.querySelector('.popup__close');

    buttonClose.addEventListener('click', function () {
      closePopup();
    });

    buttonClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });

    mapCardElement.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closePopup);
    });

    var pins = document.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      pins[i].addEventListener('click', function () {
        closePopup();
      });
    }

    return mapCardElement;
  };

})();
