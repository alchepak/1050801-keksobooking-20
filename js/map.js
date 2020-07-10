'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var onGetDataSuccess = function (items) {
    var template = document.querySelector('#pin').content;
    var mapPin = template.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < items.length; i++) {
      var htmlItem = window.pin.render(mapPin, items[i]);
      fragment.appendChild(htmlItem);
    }

    mapPins.appendChild(fragment);
  };

  var onGetDataError = function () {
    throw new Error('');
  };

  window.map = {
    buildAdverts: function () {
      window.load(onGetDataSuccess, onGetDataError);
    }
  };
})();
