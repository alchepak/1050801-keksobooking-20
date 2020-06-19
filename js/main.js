'use strict';

var MOUSE_BUTTON_CODE = 0;
var SIMILAR_ADV_COUNT = 8;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_ARROW_HEIGHT = 16;
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

/* Генерация случайных данных */

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

/* end - Генерация случайных данных */

/* Неактивное состояние страницы */

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');

var changeFormInputsState = function (form, isDisabled) {
  var formInputs = form.querySelectorAll('input, select, fieldset');
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = isDisabled;
  }
};

var setCurrentAddress = function (isPageActive) {
  var location = {
    x: Math.floor(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_WIDTH / 2),
    y: Math.floor(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_HEIGHT / 2)
  };

  if (isPageActive) {
    location.y += Math.floor(MAIN_PIN_HEIGHT / 2 + MAIN_PIN_ARROW_HEIGHT);
  }

  addressInput.value = location.x + ', ' + location.y;
};

changeFormInputsState(adForm, true);
changeFormInputsState(mapFilters, true);
setCurrentAddress(false);

/* end - Неактивное состояние страницы  */

/* Валидация полей "Количество комнат" и "Количество мест" */

var roomNumberInput = adForm.querySelector('#room_number');
var capacityInput = adForm.querySelector('#capacity');

var checkCapacityValue = function () {
  var roomsCount = parseInt(roomNumberInput.value, 10);
  var capacityCount = parseInt(capacityInput.value, 10);

  if (roomsCount === 100 && capacityCount > 0) {
    capacityInput.setCustomValidity('100 комнат не для гостей');
  } else if (roomsCount < 100 && capacityCount === 0) {
    capacityInput.setCustomValidity('Укажите количество мест');
  } else if (roomsCount < 100 && capacityCount > roomsCount) {
    capacityInput.setCustomValidity('Только для гостей, но не более ' + roomsCount);
  } else {
    capacityInput.setCustomValidity('');
  }
};

roomNumberInput.addEventListener('input', function () {
  checkCapacityValue();
});

capacityInput.addEventListener('input', function () {
  checkCapacityValue();
});

/* end - Валидация полей "Количество комнат" и "Количество мест" */

/* Активация страницы */

var mapPins = map.querySelector('.map__pins');

var activatePage = function () {
  if (map.classList.contains('map--faded')) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    changeFormInputsState(adForm, false);
    changeFormInputsState(mapFilters, false);
    setCurrentAddress(true);

    checkCapacityValue();

    var mocks = buildAdverts(SIMILAR_ADV_COUNT);
    createPinsFragment(mapPins, mocks);
  }
};

var onMainPinMouseDown = function (evt) {
  if (evt.button === MOUSE_BUTTON_CODE) {
    activatePage();
  }
};

var onMainPinEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
};

mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
mapPinMain.addEventListener('keydown', onMainPinEnterPress);

/* end - Активация страницы */

/* Отрисовка похожих объявлений */

var buildAdverts = function (length) {
  var adverts = [];

  for (var i = 0; i < length; i++) {
    var advertNumber = addLeadZero(i + 1, 2);
    var objectLocation = {
      x: generateRandomNumber(PIN_HALF_WIDTH, mapPins.clientWidth - PIN_HALF_WIDTH),
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

var createPinsFragment = function (container, items) {
  var template = document.querySelector('#pin').content;
  var mapPin = template.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < items.length; i++) {
    var htmlItem = renderPin(mapPin, items[i]);
    fragment.appendChild(htmlItem);
  }

  container.appendChild(fragment);
};

/* end - Отрисовка похожих объявлений */

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
