'use strict';

(function () {
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');

  var renderProperty = function (htmlItem, value) {
    if (value.length > 0) {
      htmlItem.textContent = value;
      return;
    }

    htmlItem.style.display = 'none';
  };

  var renderPhotos = function (card, photos) {
    var block = card.querySelector('.popup__photos');
    var template = block.querySelector('.popup__photo');

    if (photos.length > 0) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < photos.length; i++) {
        var image = template.cloneNode();
        image.src = photos[i];
        fragment.appendChild(image);
      }

      block.appendChild(fragment);
    }

    template.remove();
  };

  var closeCard = function () {
    var card = map.querySelector('.map__card');

    document.removeEventListener('keydown', onCardEscPress);
    if (card !== null) {
      card.remove();
    }
  };

  var onCardEscPress = function (evt) {
    window.util.isEscPress(evt, closeCard);
  };

  window.card = {
    render: function (advert) {
      closeCard();

      var template = document.querySelector('#card').content;
      var mapCard = template.querySelector('.map__card');
      var advertCard = mapCard.cloneNode(true);

      renderProperty(advertCard.querySelector('.popup__title'), advert.offer.title);
      renderProperty(advertCard.querySelector('.popup__text--address'), advert.offer.address);
      renderProperty(advertCard.querySelector('.popup__text--price'), advert.offer.price + '₽/ночь');
      renderProperty(advertCard.querySelector('.popup__type'), advert.offer.type);
      renderProperty(advertCard.querySelector('.popup__text--capacity'), advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
      renderProperty(advertCard.querySelector('.popup__text--time'), 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);

      advert.offer.features.forEach(function (it) {
        advertCard.querySelector('.popup__feature--' + it).classList.add('advert-feature');
      });

      Array.from(advertCard.querySelectorAll('.popup__feature:not(.advert-feature)')).forEach(function (it) {
        it.remove();
      });

      renderProperty(advertCard.querySelector('.popup__description'), advert.offer.description);
      renderPhotos(advertCard, advert.offer.photos);
      advertCard.querySelector('.popup__avatar').src = advert.author.avatar;

      advertCard.querySelector('.popup__close').addEventListener('click', function () {
        closeCard();
      });

      map.insertBefore(advertCard, filtersContainer);
      document.addEventListener('keydown', onCardEscPress);
    }
  };
})();
