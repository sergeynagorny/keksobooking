'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormReset = document.querySelector('.form__reset');
  var bookingData = [];

  var onLoadData = function (data) {
    bookingData = data;
    window.offers.render(bookingData);
  };

  pinMain.addEventListener('mouseup', function () {
    activationPage();
  });

  var activationPage = function () {
    window.backend.load(onLoadData, window.backend.errorHandler);
    map.classList.remove('map--faded');
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
