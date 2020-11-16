'use strict';

(function () {

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var CARD_COUNT = 8;
  var bookingData = window.createBookingData(CARD_COUNT);


  window.renderOffers(bookingData);

})();
