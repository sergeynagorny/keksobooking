'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');

  var tempalte = document.querySelector('template').content;
  var pinTemplate = tempalte.querySelector('.map__pin');
  var cardTemplate = tempalte.querySelector('.map__card');

  var createOfferPin = function (dataItem) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = dataItem.location.x + 'px';
    pin.style.top = dataItem.location.y + 'px';
    pinImg.src = dataItem.author.avatar;
    pinImg.alt = dataItem.offer.title;

    return pin;
  };

  var renderOfferPins = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (dataItem) {
      fragment.appendChild(createOfferPin(dataItem));
    });
    mapPins.appendChild(fragment);
  };

  var createOfferCard = function (dataItem) {
    var housingType = {flat: 'Квартира', bungalo: 'Бунгало', palace: 'Дворец', house: 'Дом'};

    var card = cardTemplate.cloneNode(true);
    var offerTitle = card.querySelector('.popup__title');
    var offerAddress = card.querySelector('.popup__text--address');
    var offerPrice = card.querySelector('.popup__text--price');
    var offerType = card.querySelector('.popup__type');
    var offerCapacity = card.querySelector('.popup__text--capacity');
    var offerTime = card.querySelector('.popup__text--time');
    var offerDescription = card.querySelector('.popup__description');
    var offerFeatures = card.querySelector('.popup__features');
    var offerPhotos = card.querySelector('.popup__photos');
    var offerAvatar = card.querySelector('.popup__avatar');
    var offerClose = card.querySelector('.popup__close');

    card.classList.remove('hidden');
    offerTitle.textContent = dataItem.offer.title;
    offerAddress.textContent = dataItem.offer.address;
    offerPrice.textContent = dataItem.offer.price + ' ₽/ночь';
    offerType.textContent = housingType[dataItem.offer.type];
    offerCapacity.textContent = dataItem.offer.rooms + ' комнаты ' + 'для ' + dataItem.offer.guests + ' гостей';
    offerTime.textContent = 'Заезд после ' + dataItem.offer.checkin + ', выезд до ' + dataItem.offer.checkout;
    offerDescription.textContent = dataItem.offer.description;
    offerAvatar.src = dataItem.author.avatar;

    offerFeatures.innerHTML = '';
    dataItem.offer.features.forEach(function (item) {
      var featuresItem = document.createElement('li');
      featuresItem.classList.add('feature');
      featuresItem.classList.add('feature--' + item);
      offerFeatures.appendChild(featuresItem);
    });

    dataItem.offer.photos.forEach(function (item) {
      var photoItem = document.createElement('li');
      var photoImg = document.createElement('img');

      photoImg.src = item;
      photoItem.appendChild(photoImg);
      offerPhotos.appendChild(photoItem);
    });

    return card;
  };

  var renderOfferCards = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (dataItem) {
      fragment.appendChild(createOfferCard(dataItem));
    });
    map.appendChild(fragment);
    map.appendChild(mapFilter);
  };

  window.renderOffers = function (data) {
    renderOfferPins(data);
    renderOfferCards(data);
  };

})();
