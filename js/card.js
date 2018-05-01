'use strict';

(function () {

  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapCardTypeRu = {'flat': 'Квартира', 'bungalo': 'Бунгало', 'house': 'Дом', 'palace': 'Дворец'};
  var featureClassListMap = {'wifi': 'popup__feature--wifi', 'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking', 'washer': 'popup__feature--washer', 'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'};

  window.renderCardElement = function (data) {
    var mapCardElement = mapCardTemplate.cloneNode(true);
    mapCardElement.querySelector('.popup__title').textContent = data.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    mapCardElement.querySelector('.popup__type').textContent = mapCardTypeRu[data.offer.type];

    mapCardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты'
+ ' для ' + data.offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin +
', выезд до ' + data.offer.checkout;

    var mapCardFeatures = mapCardElement.querySelector('.popup__features');

    var getMapCardFeatures = function () {

      for (var j = 0; j < data.offer.features.length; j++) {
        var mapCardFeature = document.createElement('li');
        mapCardFeature.classList.add('popup__feature');
        mapCardFeature.classList.add(featureClassListMap[data.offer.features[j]]);
        mapCardFeature.textContent = featureClassListMap[data.offer.features[j]];
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

    var pins = window.mapData.mapPinsList.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      pins[i].addEventListener('click', function () {
        closePopup();
      });
    }

    return mapCardElement;
  };

})();
