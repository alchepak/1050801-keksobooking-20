'use strict';

window.pin = (function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var getPosition = function (location) {
    return {
      left: location.x - parseInt(PIN_WIDTH / 2, 10),
      top: location.y - PIN_HEIGHT
    };
  };

  var exports = {
    render: function (template, advert) {
      var pin = template.cloneNode(true);

      var position = getPosition(advert.location);
      pin.style.left = position.left + 'px';
      pin.style.top = position.top + 'px';

      var img = pin.querySelector('img');
      img.src = advert.author.avatar;
      img.alt = advert.offer.title;

      return pin;
    }
  };

  return exports;
})();
