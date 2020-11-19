'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var filterType = filter.querySelector('#housing-type');
  var filterPrice = filter.querySelector('#housing-price');
  var filterRooms = filter.querySelector('#housing-rooms');
  var filterGuests = filter.querySelector('#housing-guests');
  var filterFeatures = Array.from(filter.querySelectorAll('input[name=features]'));

  var filterPriceMap = {
    low: {min: 0, max: 10000},
    middle: {min: 10000, max: 50000},
    high: {min: 50000, max: Infinity}
  };

  window.filter = function (data, callback) {
    var bookingData = data;

    filter.addEventListener('input', function () {

      var filterFeaturesActive = filterFeatures.filter(function (item) {
        return item.checked;
      }).map(function (item) {
        return item.value;
      });

      var checkFeatures = function (item) {
        var featureList = filterFeaturesActive.filter(function (el) {
          return item.offer.features.indexOf(el) !== -1;
        });

        return featureList.length === filterFeaturesActive.length;
      };

      var bookingDataCopy = bookingData.filter(function (item) {
        return (filterType.value === 'any') ? true : item.offer.type === filterType.value;
      }).filter(function (item) {
        return (filterPrice.value === 'any') ? true : (item.offer.price >= filterPriceMap[filterPrice.value].min && item.offer.price <= filterPriceMap[filterPrice.value].max);
      }).filter(function (item) {
        return (filterRooms.value === 'any') ? true : item.offer.rooms.toString() >= filterRooms.value;
      }).filter(function (item) {
        return (filterGuests.value === 'any') ? true : item.offer.guests.toString() >= filterGuests.value;
      }).filter(function (item) {
        return checkFeatures(item);
      });

      callback(bookingDataCopy);
    });

  };

})();

