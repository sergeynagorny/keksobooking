'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormReset = document.querySelector('.form__reset');

  var CARD_COUNT = 8;
  var bookingData = window.createBookingData(CARD_COUNT);

  pinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    activationPage();
  });

  var activationPage = function () {
    window.offers.render(bookingData);
    window.form.enable();
  };

  var deactivationPage = function () {
    map.classList.add('map--faded');
    window.offers.remove();
    window.form.disabled();
  };

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    noticeForm.reset();
    window.pinMain.reset();
    deactivationPage();
  });

  noticeFormReset.addEventListener('click', function (evt) {
    noticeForm.reset();
    window.pinMain.reset();
    deactivationPage();
  });

})();
