'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var CARD_COUNT = 8;
  var bookingData = window.createBookingData(CARD_COUNT);

  pinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    activationPage();
  });

  var activationPage = function () {
    window.renderOffers(bookingData);
    window.form.enable();
  };

  var deactivationPage = function () {
    map.classList.add('map--faded');
    window.form.disabled();
  };

})();
