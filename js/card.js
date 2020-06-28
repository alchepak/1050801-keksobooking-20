'use strict';

(function () {
  /* Отрисовка карточки объявления */

  // var filtersContainer = map.querySelector('.map__filters-container');

  // var renderAdvertProperty = function (htmlItem, value) {
  //   if (value.length > 0) {
  //     htmlItem.textContent = value;
  //     return;
  //   }

  //   htmlItem.style.display = 'none';
  // };

  // var renderAdvertPhotos = function (card, photos) {
  //   var block = card.querySelector('.popup__photos');
  //   var template = block.querySelector('.popup__photo');

  //   if (photos.length > 0) {
  //     var fragment = document.createDocumentFragment();

  //     for (var i = 0; i < photos.length; i++) {
  //       var image = template.cloneNode();
  //       image.src = photos[i];
  //       fragment.appendChild(image);
  //     }

  //     block.appendChild(fragment);
  //   }

  //   template.remove();
  // };

  // var renderAdvertCard = function (advert) {
  //   var template = document.querySelector('#card').content;
  //   var mapCard = template.querySelector('.map__card');
  //   var advertCard = mapCard.cloneNode(true);

  //   renderAdvertProperty(advertCard.querySelector('.popup__title'), advert.offer.title);
  //   renderAdvertProperty(advertCard.querySelector('.popup__text--address'), advert.offer.address);
  //   renderAdvertProperty(advertCard.querySelector('.popup__text--price'), advert.offer.price + '₽/ночь');
  //   renderAdvertProperty(advertCard.querySelector('.popup__type'), OFFER_TYPES[advert.offer.type]);
  //   renderAdvertProperty(advertCard.querySelector('.popup__text--capacity'), advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
  //   renderAdvertProperty(advertCard.querySelector('.popup__text--time'), 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);

  //   var popupFeatures = advertCard.querySelector('.popup__features');
  //   for (var i = 0; i < FEATURES.length; i++) {
  //     if (advert.offer.features.indexOf(FEATURES[i]) < 0) {
  //       popupFeatures.querySelector('.popup__feature--' + FEATURES[i]).remove();
  //     }
  //   }

  //   renderAdvertProperty(advertCard.querySelector('.popup__description'), advert.offer.description);
  //   renderAdvertPhotos(advertCard, advert.offer.photos);
  //   advertCard.querySelector('.popup__avatar').src = advert.author.avatar;

  //   map.insertBefore(advertCard, filtersContainer);
  // };

  /* end - Отрисовка карточки объявления */

})();
