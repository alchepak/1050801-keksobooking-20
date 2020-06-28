'use strict';

window.mainPin = (function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var ARROW_HEIGHT = 16;

  var pin = document.querySelector('.map__pin--main');

  var exports = {
    getPosition: function (isPageActive) {
      var position = {
        x: Math.floor(parseInt(pin.style.left, 10) + PIN_WIDTH / 2),
        y: Math.floor(parseInt(pin.style.top, 10) + PIN_HEIGHT / 2)
      };

      if (isPageActive) {
        position.y += Math.floor(PIN_HEIGHT / 2 + ARROW_HEIGHT);
      }

      return position;
    }
  };

  return exports;
})();
