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

  var onGetDataError = function (message) {
    var template = document.querySelector('#error').content;
    var error = template.querySelector('.error');
    var block = error.cloneNode(true);
    block.querySelector('.error__message').textContent = message;
    document.body.appendChild(block);
  };

  window.map = {
    buildAdverts: function () {
      window.load(onGetDataSuccess, onGetDataError);
    }
  };
})();
