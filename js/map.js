'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  window.map = {
    renderAdverts: function (items) {
      window.map.removeAdverts();
      window.card.close();

      var template = document.querySelector('#pin').content;
      var mapPin = template.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();

      items.forEach(function (it) {
        var htmlItem = window.pin.render(mapPin, it);
        fragment.appendChild(htmlItem);
      });

      mapPins.appendChild(fragment);
    },
    removeAdverts: function () {
      var adverts = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      Array.from(adverts).forEach(function (it) {
        mapPins.removeChild(it);
      });
    },
    getWidth: function () {
      return map.clientWidth;
    }
  };
})();
