'use strict';

var MIN_PIN_TOP = 130;
var MAX_PIN_TOP = 630;
var MAX_PRICE = 1000000;
var OFFER_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Бунгало',
  'bungalo': 'Дом'
};
var ROOM_COUNTS = [1, 2, 3, 100];
var MAX_GUEST_COUNT = 3;
var CHECKIN_VALUES = ['12:00', '13:00', '14:00'];
var CHECKOUT_VALUES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;

var addLeadZero = function (num, size) {
  var result = num.toString();
  while (result.length < size) {
    result = '0' + result;
  }

  return result;
};

var generateRandomNumber = function (minValue, maxValue) {
  var randomValue = Math.floor(Math.random() * (maxValue));
  if (randomValue < minValue) {
    return minValue;
  }

  return randomValue;
};

var getRandomValue = function (items) {
  var index = Math.random() * items.length;
  return items[Math.floor(index)];
};

var getRandomProperty = function (object) {
  var keys = Object.keys(object);
  return getRandomValue(keys);
};

var getRandomArray = function (items) {
  var length = generateRandomNumber(0, items.length);

  var result = [];
  for (var i = 0; i < length; i++) {
    var value = getRandomValue(items);
    if (result.indexOf(value) < 0) {
      result.push(value);
    }
  }

  return result;
};

var buildAdverts = function (length) {
  var adverts = [];

  for (var i = 0; i < length; i++) {
    var advertNumber = addLeadZero(i + 1, 2);
    var objectLocation = {
      x: generateRandomNumber(PIN_HALF_WIDTH, pinsBlock.clientWidth - PIN_HALF_WIDTH),
      y: generateRandomNumber(MIN_PIN_TOP, MAX_PIN_TOP)
    };

    adverts.push({
      author: {
        avatar: 'img/avatars/user' + advertNumber + '.png'
      },
      offer: {
        title: 'Объявление №' + advertNumber,
        address: objectLocation.x + ', ' + objectLocation.y,
        price: generateRandomNumber(0, MAX_PRICE),
        type: getRandomProperty(OFFER_TYPES),
        rooms: getRandomValue(ROOM_COUNTS),
        guests: generateRandomNumber(0, MAX_GUEST_COUNT),
        checkin: getRandomValue(CHECKIN_VALUES),
        checkout: getRandomValue(CHECKOUT_VALUES),
        features: getRandomArray(FEATURES),
        description: 'Описание объявления №' + advertNumber,
        photos: getRandomArray(PHOTOS)
      },
      location: objectLocation
    });
  }

  return adverts;
};

var getPinPosition = function (location) {
  return {
    left: location.x - PIN_HALF_WIDTH,
    top: location.y - PIN_HEIGHT
  };
};

var renderPin = function (template, advert) {
  var pin = template.cloneNode(true);

  var position = getPinPosition(advert.location);
  pin.style.left = position.left + 'px';
  pin.style.top = position.top + 'px';

  var img = pin.querySelector('img');
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;

  return pin;
};

var createPinsFragment = function (items) {
  var template = document.querySelector('#pin').content;
  var mapPin = template.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < items.length; i++) {
    var htmlItem = renderPin(mapPin, items[i]);
    fragment.appendChild(htmlItem);
  }

  pinsBlock.appendChild(fragment);
};

var map = document.querySelector('.map');
var pinsBlock = map.querySelector('.map__pins');
var filtersContainer = map.querySelector('.map__filters-container');
map.classList.remove('map--faded');

var mocks = buildAdverts(8);
createPinsFragment(mocks);

var renderAdvertProperty = function (htmlItem, value) {
  if (value.length > 0) {
    htmlItem.textContent = value;
    return;
  }

  htmlItem.style.display = 'none';
};

var renderAdvertPhotos = function (card, photos) {
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

var renderAdvertCard = function (advert) {
  var template = document.querySelector('#card').content;
  var mapCard = template.querySelector('.map__card');
  var advertCard = mapCard.cloneNode(true);

  renderAdvertProperty(advertCard.querySelector('.popup__title'), advert.offer.title);
  renderAdvertProperty(advertCard.querySelector('.popup__text--address'), advert.offer.address);
  renderAdvertProperty(advertCard.querySelector('.popup__text--price'), advert.offer.price + '₽/ночь');
  renderAdvertProperty(advertCard.querySelector('.popup__type'), OFFER_TYPES[advert.offer.type]);
  renderAdvertProperty(advertCard.querySelector('.popup__text--capacity'), advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
  renderAdvertProperty(advertCard.querySelector('.popup__text--time'), 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);

  var popupFeatures = advertCard.querySelector('.popup__features');
  for (var i = 0; i < FEATURES.length; i++) {
    if (advert.offer.features.indexOf(FEATURES[i]) < 0) {
      popupFeatures.querySelector('.popup__feature--' + FEATURES[i]).remove();
    }
  }

  renderAdvertProperty(advertCard.querySelector('.popup__description'), advert.offer.description);
  renderAdvertPhotos(advertCard, advert.offer.photos);
  advertCard.querySelector('.popup__avatar').src = advert.author.avatar;

  map.insertBefore(advertCard, filtersContainer);
};

renderAdvertCard(mocks[0]);
