'use strict';

(function () {

  var mapCardPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinWidth = mapCardPinTemplate.querySelector('img').width;
  var pinHeight = mapCardPinTemplate.querySelector('img').height;

  window.renderPinElement = function (data) {

    var pinElement = mapCardPinTemplate.cloneNode(true);
    pinElement.style.left = (data.location.x - pinWidth / 2) + 'px';
    pinElement.style.top = (data.location.y - pinHeight) + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    var createCardElement = function () {
      var fragmentCardElement = document.createDocumentFragment();
      fragmentCardElement.appendChild(window.renderCardElement(data));

      window.mapData.userDialog.insertBefore(fragmentCardElement, window.mapData.mapFilters);
    };

    pinElement.addEventListener('click', function () {
      createCardElement();
    });

    pinElement.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, createCardElement);
    });

    return pinElement;

  };

})();
