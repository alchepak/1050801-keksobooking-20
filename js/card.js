'use strict';

(function () {
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var typeListMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var renderProperty = function (htmlItem, value) {
    if (value === undefined || value.length === 0) {
      htmlItem.remove();
      return;
    }

    htmlItem.textContent = value;
  };

  var tuneFeaturesList = function (features, card) {
    if (features.length === 0) {
      card.querySelector('.popup__features').remove();
      return;
    }

    features.forEach(function (it) {
      card.querySelector('.popup__feature--' + it).classList.add('advert-feature');
    });

    var missingFeatures = card.querySelectorAll('.popup__feature:not(.advert-feature)');
    Array.from(missingFeatures).forEach(function (it) {
      it.remove();
    });
  };

  var renderPhotos = function (card, photos) {
    var block = card.querySelector('.popup__photos');
    if (photos.length === 0) {
      block.remove();
      return;
    }

    var template = block.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();

    photos.forEach(function (it) {
      var image = template.cloneNode();
      image.src = it;
      fragment.appendChild(image);
    });

    block.appendChild(fragment);
    template.remove();
  };

  var onCardEscPress = function (evt) {
    window.util.isEscPress(evt, window.card.close);
  };

  window.card = {
    render: function (advert) {
      window.card.close();

      var template = document.querySelector('#card').content;
      var mapCard = template.querySelector('.map__card');
      var advertCard = mapCard.cloneNode(true);

      renderProperty(advertCard.querySelector('.popup__title'), advert.offer.title);
      renderProperty(advertCard.querySelector('.popup__text--address'), advert.offer.address);
      renderProperty(advertCard.querySelector('.popup__text--price'), advert.offer.price + '₽/ночь');
      renderProperty(advertCard.querySelector('.popup__type'), typeListMap[advert.offer.type]);
      renderProperty(advertCard.querySelector('.popup__text--capacity'), advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
      renderProperty(advertCard.querySelector('.popup__text--time'), 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);
      renderProperty(advertCard.querySelector('.popup__description'), advert.offer.description);

      tuneFeaturesList(advert.offer.features, advertCard);
      renderPhotos(advertCard, advert.offer.photos);
      advertCard.querySelector('.popup__avatar').src = advert.author.avatar;

      advertCard.querySelector('.popup__close').addEventListener('click', function () {
        window.card.close();
      });

      map.insertBefore(advertCard, filtersContainer);
      document.addEventListener('keydown', onCardEscPress);
    },
    close: function () {
      var card = map.querySelector('.map__card');
      var activePins = map.querySelectorAll('.map__pin--active');

      Array.from(activePins).forEach(function (it) {
        it.classList.remove('map__pin--active');
      });

      document.removeEventListener('keydown', onCardEscPress);
      if (card !== null) {
        card.remove();
      }
    }
  };
})();
