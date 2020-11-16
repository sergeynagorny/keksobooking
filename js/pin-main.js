'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var noticeAddress = document.querySelector('#address');
  var mainPinStartCoords = {x: mainPin.offsetLeft, y: mainPin.offsetTop};

  var setAddressPinValue = function (x, y) {
    var pinHeight = 85;
    noticeAddress.value = x + ', ' + (y + pinHeight);
  };

  var resetPin = function () {
    mainPin.style.left = mainPinStartCoords.x + 'px';
    mainPin.style.top = mainPinStartCoords.y + 'px';

    setAddressPinValue(mainPinStartCoords.x, mainPinStartCoords.y);
  };

  resetPin();

  var enableDraggble = function (dragElement, dragHandler) {

    dragHandler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCords.x - moveEvt.clientX,
          y: startCords.y - moveEvt.clientY,
        };

        startCords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        var coords = {
          x: dragElement.offsetLeft - shift.x,
          y: dragElement.offsetTop - shift.y,
        };

        var restriction = {
          min: {
            x: window.utils.MAP_COORD.MIN.X,
            y: window.utils.MAP_COORD.MIN.Y
          },
          max: {
            x: window.utils.MAP_COORD.MAX.X,
            y: window.utils.MAP_COORD.MAX.Y,
          }
        };


        dragElement.style.left = Math.max(restriction.min.x, Math.min(coords.x, restriction.max.x)) + 'px';
        dragElement.style.top = Math.max(restriction.min.y, Math.min(coords.y, restriction.max.y)) + 'px';

        setAddressPinValue(coords.x, coords.y);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  };

  enableDraggble(mainPin, mainPin);

  window.pinMain = {
    reset: resetPin
  };


})();
