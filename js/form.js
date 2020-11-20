'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldset = Array.from(noticeForm.querySelectorAll('fieldset'));
  var noticePrice = noticeForm.querySelector('#price');
  var noticeType = noticeForm.querySelector('#type');
  var noticeTimeIn = noticeForm.querySelector('#timein');
  var noticeTimeOut = noticeForm.querySelector('#timeout');
  var noticeRooms = noticeForm.querySelector('#room_number');
  var noticeCapacity = noticeForm.querySelector('#capacity');
  var noticeBtnReset = noticeForm.querySelector('.form__reset');

  var picturesPinUpload = document.querySelector('.notice__photo');
  var picturePinPreview = picturesPinUpload.querySelector('.notice__preview img');
  var picturePinInput = picturesPinUpload.querySelector('input');
  var picturePinDropArea = picturesPinUpload.querySelector('.drop-zone');
  var pinPreviewDefualtImg = picturePinPreview.src;

  var picturesOfferUpload = document.querySelector('.form__photo-container');
  var picturesOfferContainer = document.querySelector('.notice__form-photo');
  var picturesOfferInput = picturesOfferUpload.querySelector('input');
  var picturesOfferDropArea = picturesOfferUpload.querySelector('.drop-zone');

  window.uploadPreview.image(picturePinPreview, picturePinInput, picturePinDropArea);
  window.uploadPreview.gallery(picturesOfferContainer, picturesOfferInput, picturesOfferDropArea);


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

  var formSendData = function (callback) {
    noticeForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      window.backend.save(new FormData(noticeForm), function () {
        picturesOfferContainer.innerHTML = '';
        picturePinPreview.src = pinPreviewDefualtImg;
        callback();
      }, window.backend.errorHandler);
    });
  };

  var formReset = function (callback) {
    noticeBtnReset.addEventListener('click', function () {
      picturesOfferContainer.innerHTML = '';
      picturePinPreview.src = pinPreviewDefualtImg;
      noticeForm.reset();
      window.pinMain.reset();
      callback();
    });
  };

  window.form = {
    enable: formEnable,
    disabled: formDisabled,
    send: formSendData,
    reset: formReset,
  };

  window.form.disabled();

})();
