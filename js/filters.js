'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

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
