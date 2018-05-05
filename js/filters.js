'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var PRICE_LEVEL = {low: 10000, high: 50000};
  var ROOM_CAPACITY_AMOUNT = {one: 1, two: 2, three: 3};

  var filters = document.querySelector('.map__filters');
  var propertyType = document.querySelector('#housing-type');
  var propertyPrice = document.querySelector('#housing-price');
  var propertyRoomNumber = document.querySelector('#housing-rooms');
  var propertyCapacity = document.querySelector('#housing-guests');
  var propertyFeaturesList = document.querySelectorAll('.map__features input');
  var lastTimeout;

  filters.addEventListener('change', function () {
    var filteredProperties = window.mapData.properties.slice(0);


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
          return it.offer.price <= PRICE_LEVEL.high && it.offer.price >= PRICE_LEVEL.low;
        });
        break;
      case 'low':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price <= PRICE_LEVEL.low;
        });
        break;
      case 'high':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.price >= PRICE_LEVEL.high;
        });
        break;
    }

    switch (propertyRoomNumber.value) {
      case '1':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === ROOM_CAPACITY_AMOUNT.one;
        });
        break;
      case '2':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === ROOM_CAPACITY_AMOUNT.two;
        });
        break;
      case '3':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.rooms === ROOM_CAPACITY_AMOUNT.three;
        });
        break;
    }

    switch (propertyCapacity.value) {
      case '1':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.guests === ROOM_CAPACITY_AMOUNT.one;
        });
        break;
      case '2':
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.guests === ROOM_CAPACITY_AMOUNT.two;
        });
        break;
    }

    for (var i = 0; i < propertyFeaturesList.length; i++) {

      if (propertyFeaturesList[i].checked) {
        filteredProperties = filteredProperties.filter(function (it) {
          return it.offer.features.indexOf(propertyFeaturesList[i].value) >= 0;
        });
      }
    }

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      window.util.createPins(filteredProperties);
    }, DEBOUNCE_INTERVAL);

  });

  window.removeFilters = function () {

    propertyType.selectedIndex = 0;
    propertyPrice.selectedIndex = 0;
    propertyRoomNumber.selectedIndex = 0;
    propertyCapacity.selectedIndex = 0;

    window.util.removeFeaturesChecked(propertyFeaturesList);

  };

})();
