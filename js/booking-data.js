'use strict';

(function () {

  var dataAvatar = {path: 'img/avatars/user', filename: '.png'};
  var dataTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var dataTypes = ['palace', 'flat', 'house', 'bungalo'];
  var dataChecks = ['12:00', '13:00', '14:00'];
  var dataFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var dataPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.utils.getShuffleArray(dataTitles);

  var createAvatarPath = function (i) {
    var avatarNumber = i < 10 ? '0' + (i + 1) : i + 1;
    return dataAvatar.path + avatarNumber + dataAvatar.filename;
  };

  window.createBookingData = function (ammount) {
    var bookingData = [];

    for (var i = 0; i < ammount; i++) {

      var dataLocation = {
        x: window.utils.getRandomInteger(130, 1100),
        y: window.utils.getRandomInteger(130, 630)
      };

      bookingData.push(
          {
            author: {
              avatar: createAvatarPath(i),
            },
            offer: {
              title: dataTitles[i],
              address: dataLocation.x + ', ' + dataLocation.y,
              price: window.utils.getRandomInteger(1000, 1000000),
              type: window.utils.getRandomItem(dataTypes),
              rooms: window.utils.getRandomInteger(1, 5),
              guests: window.utils.getRandomInteger(1, 10),
              checkin: window.utils.getRandomItem(dataChecks),
              checkout: window.utils.getRandomItem(dataChecks),
              features: window.utils.getRandomItems(dataFeatures),
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


