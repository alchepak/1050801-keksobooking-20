'use strict';

(function () {
  var MAX_ITEMS_COUNT = 5;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  window.map = {
    renderAdverts: function (items) {
      window.map.removeAdverts();
      window.card.close();

      var template = document.querySelector('#pin').content;
      var mapPin = template.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();
      var count = items.length > MAX_ITEMS_COUNT ? MAX_ITEMS_COUNT : items.length;

      for (var i = 0; i < count; i++) {
        var htmlItem = window.pin.render(mapPin, items[i]);
        fragment.appendChild(htmlItem);
      }

      mapPins.appendChild(fragment);
    },
    removeAdverts: function () {
      var adverts = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      adverts.forEach(function (it) {
        mapPins.removeChild(it);
      });
    },
    getWidth: function () {
      return map.clientWidth;
    }
  };
})();
