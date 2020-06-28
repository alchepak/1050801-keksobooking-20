'use strict';

window.map = (function () {
  var MAX_PRICE = 1000000;
  var OFFER_TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Бунгало',
    'bungalo': 'Дом'
  };
  var ROOM_COUNTS = [1, 2, 3, 100];
  var MAX_GUEST_COUNT = 3;
  var MIN_TOP = 130;
  var MAX_TOP = 630;
  var MAP_PADDING = 25;
  var CHECKIN_VALUES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_VALUES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var exports = {
    buildAdverts: function (length) {
      var adverts = [];

      for (var i = 0; i < length; i++) {
        var advertNumber = window.data.addLeadZero(i + 1, 2);
        var objectLocation = {
          x: window.data.generateRandomNumber(MAP_PADDING, mapPins.clientWidth - MAP_PADDING),
          y: window.data.generateRandomNumber(MIN_TOP, MAX_TOP)
        };

        adverts.push({
          author: {
            avatar: 'img/avatars/user' + advertNumber + '.png'
          },
          offer: {
            title: 'Объявление №' + advertNumber,
            address: objectLocation.x + ', ' + objectLocation.y,
            price: window.data.generateRandomNumber(0, MAX_PRICE),
            type: window.data.getRandomProperty(OFFER_TYPES),
            rooms: window.data.getRandomValue(ROOM_COUNTS),
            guests: window.data.generateRandomNumber(0, MAX_GUEST_COUNT),
            checkin: window.data.getRandomValue(CHECKIN_VALUES),
            checkout: window.data.getRandomValue(CHECKOUT_VALUES),
            features: window.data.getRandomArray(FEATURES),
            description: 'Описание объявления №' + advertNumber,
            photos: window.data.getRandomArray(PHOTOS)
          },
          location: objectLocation
        });
      }

      return adverts;
    },
    createPins: function (items) {
      var template = document.querySelector('#pin').content;
      var mapPin = template.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < items.length; i++) {
        var htmlItem = window.pin.render(mapPin, items[i]);
        fragment.appendChild(htmlItem);
      }

      mapPins.appendChild(fragment);
    }
  };

  return exports;
})();
