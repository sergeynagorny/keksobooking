'use strict';

(function () {

  var CARD_COUNT = 8;
  var bookingData = window.createBookingData(CARD_COUNT);

  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var pinsContainer = document.querySelector('.map__pins');

  var tempalte = document.querySelector('template').content;

  var createOfferPins = function (data) {
    var pins = [];
    var pinTemplate = tempalte.querySelector('.map__pin');

    data.forEach(function (dataItem) {
      var pin = pinTemplate.cloneNode(true);
      var pinImg = pin.querySelector('img');
      pin.style.left = dataItem.location.x + 'px';
      pin.style.top = dataItem.location.y + 'px';
      pinImg.src = dataItem.author.avatar;
      pinImg.alt = dataItem.offer.title;
      pins.push(pin);
    });

    return pins;
  };

  var renderOfferPins = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      fragment.appendChild(item);
    });

    pinsContainer.appendChild(fragment);
  };


  var createOfferCards = function (array) {
    var cards = [];
    var cardTemplate = tempalte.querySelector('.map__card');
    var housingType = {flat: 'Квартира', bungalo: 'Бунгало', palace: 'Дворец', house: 'Дом'};

    array.forEach(function (data) {
      var offerCards = cardTemplate.cloneNode(true);

      var offerTitle = offerCards.querySelector('.popup__title');
      var offerAddress = offerCards.querySelector('.popup__text--address');
      var offerPrice = offerCards.querySelector('.popup__text--price');
      var offerType = offerCards.querySelector('.popup__type');
      var offerCapacity = offerCards.querySelector('.popup__text--capacity');
      var offerTime = offerCards.querySelector('.popup__text--time');
      var offerDescription = offerCards.querySelector('.popup__description');
      var offerFeatures = offerCards.querySelector('.popup__features');
      var offerPhotos = offerCards.querySelector('.popup__photos');
      var offerAvatar = offerCards.querySelector('.popup__avatar');
      var offerClose = offerCards.querySelector('.popup__close');

      offerCards.classList.remove('hidden');
      offerTitle.textContent = data.offer.title;
      offerAddress.textContent = data.offer.address;
      offerPrice.textContent = data.offer.price + ' ₽/ночь';
      offerType.textContent = housingType[data.offer.type];
      offerCapacity.textContent = data.offer.rooms + ' комнаты ' + 'для ' + data.offer.guests + ' гостей';
      offerTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      offerDescription.textContent = data.offer.description;
      offerAvatar.src = data.author.avatar;

      offerFeatures.innerHTML = '';
      data.offer.features.forEach(function (item) {
        var featuresItem = document.createElement('li');
        featuresItem.classList.add('feature');
        featuresItem.classList.add('feature--' + item);
        offerFeatures.appendChild(featuresItem);
      });

      data.offer.photos.forEach(function (item) {
        var photoItem = document.createElement('li');
        var photoImg = document.createElement('img');

        photoImg.src = item;
        photoItem.appendChild(photoImg);
        offerPhotos.appendChild(photoItem);
      });

      cards.push(offerCards);
    });

    return cards;
  };


  var renderOfferCards = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      fragment.appendChild(item);
    });

    map.appendChild(fragment);
    map.appendChild(mapFilter);
  };


  window.renderOffers = function () {
    renderOfferPins(createOfferPins(bookingData));
    renderOfferCards(createOfferCards(bookingData));
  };


})();
