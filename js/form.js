'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldset = Array.from(noticeForm.querySelectorAll('fieldset'));
  var noticePrice = noticeForm.querySelector('#price');
  var noticeType = noticeForm.querySelector('#type');
  var noticeAddress = noticeForm.querySelector('#address');
  var noticeTimeIn = noticeForm.querySelector('#timein');
  var noticeTimeOut = noticeForm.querySelector('#timeout');
  var noticeRooms = noticeForm.querySelector('#room_number');
  var noticeCapacity = noticeForm.querySelector('#capacity');
  var noticeBtnReset = noticeForm.querySelector('.form__reset');

  // Price & Type
  var noticeMinPrice = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var isNoticePriceUserChanged = false;

  noticePrice.addEventListener('input', function () {
    isNoticePriceUserChanged = true;
  });

  var changeNoticePrice = function (typeValue) {
    window.utils.setAttribute(noticePrice, 'placeholder', noticeMinPrice[typeValue]);
    window.utils.setAttribute(noticePrice, 'min', noticeMinPrice[typeValue]);
    if (!isNoticePriceUserChanged) {
      noticePrice.value = noticeMinPrice[typeValue];
    }
  };

  noticeType.addEventListener('input', function () {
    changeNoticePrice(noticeType.value);
  });

  // TimeIn & TimeOut
  noticeTimeIn.addEventListener('input', function () {
    noticeTimeOut.value = noticeTimeIn.value;
  });

  noticeTimeOut.addEventListener('input', function () {
    noticeTimeIn.value = noticeTimeOut.value;
  });


  // Rooms & Capacity
  var setNoticeCapacity = function (roomsValue) {
    var noticeMinCapacity = {1: ['1'], 2: ['1', '2'], 3: ['1', '2', '3'], 100: ['0']};
    var capacityOptions = Array.from(document.querySelectorAll('#capacity option'));
    var capacityArray = noticeMinCapacity[roomsValue];

    noticeCapacity.value = capacityArray[capacityArray.length - 1];
    window.utils.setAttribute(capacityOptions, 'disabled');

    capacityArray.forEach(function (item) {
      var capacityElement = document.querySelector('#capacity option[value="' + item + '"]');
      window.utils.removeAttribute(capacityElement, 'disabled');
    });
  };

  setNoticeCapacity(noticeRooms.value);

  noticeRooms.addEventListener('input', function () {
    setNoticeCapacity(noticeRooms.value);
  });


  var formEnable = function () {
    noticeForm.classList.remove('notice__form--disabled');
    window.utils.removeAttribute(noticeFieldset, 'disabled');
  };

  var formDisabled = function () {
    noticeForm.classList.add('notice__form--disabled');
    window.utils.setAttribute(noticeFieldset, 'disabled');
  };

  window.form = {
    enable: formEnable,
    disabled: formDisabled,
  };

  window.form.disabled();

})();
