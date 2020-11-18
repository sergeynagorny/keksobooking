'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormReset = document.querySelector('.form__reset');
  var bookingData = [];


  // TODO: Оптимизироовать страницу. Активация, только если она выключена

  var onLoadData = function (data) {
    console.log('загрузка');
    bookingData = data;
    window.offers.render(bookingData);
  };

  pinMain.addEventListener('mouseup', function () {
    activationPage();
  });

  var activationPage = function () {
    if (map.classList.contains('map--faded')) {
      window.backend.load(onLoadData, window.backend.errorHandler);
      map.classList.remove('map--faded');
      window.form.enable();
    }
  };

  var deactivationPage = function () {
    map.classList.add('map--faded');
    window.offers.remove();
    window.form.disabled();
  };

  window.form.send(deactivationPage);
  window.form.reset(deactivationPage);

})();
