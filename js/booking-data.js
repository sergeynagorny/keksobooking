'use strict';

(function () {

  var dataAvatar = {path: 'img/avatars/user', filename: '.png'};
  var dataTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var dataTypes = ['palace', 'flat', 'house', 'bungalo'];
  var dataChecks = ['12:00', '13:00', '14:00'];
  var dataFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var dataPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  function getShuffleArray(array) {
    var j;
    var x;
    var i;

    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  getShuffleArray(dataTitles);


  var getRandomInteger = function (min, max) {
    var randomInteger = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInteger);
  };

  var getRandomItem = function (arr) {
    var randomItem = arr[getRandomInteger(0, arr.length - 1)];
    return randomItem;
  };

  var getRandomItems = function (arr) {
    var randomItems = [];
    for (var i = 0; i < arr.length; i++) {
      if (Math.round(Math.random())) {
        randomItems.push(arr[i]);
      }
    }
    return randomItems;
  };

  var createAvatarPath = function (i) {
    var avatarNumber = i < 10 ? '0' + (i + 1) : i + 1;
    return dataAvatar.path + avatarNumber + dataAvatar.filename;
  };

  window.createBookingData = function (ammount) {
    var bookingData = [];

    for (var i = 0; i < ammount; i++) {

      var dataLocation = {
        x: getRandomInteger(130, 1100),
        y: getRandomInteger(130, 630)
      };

      bookingData.push(
          {
            author: {
              avatar: createAvatarPath(i),
            },
            offer: {
              title: dataTitles[i],
              address: dataLocation.x + ', ' + dataLocation.y,
              price: getRandomInteger(1000, 1000000),
              type: getRandomItem(dataTypes),
              rooms: getRandomInteger(1, 5),
              guests: getRandomInteger(1, 10),
              checkin: getRandomItem(dataChecks),
              checkout: getRandomItem(dataChecks),
              features: getRandomItems(dataFeatures),
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu orci posuere massa sollicitudin condimentum sed vitae turpis',
              photos: dataPhotos
            },
            location: dataLocation
          }
      );

    }
    return bookingData;
  };

})();


