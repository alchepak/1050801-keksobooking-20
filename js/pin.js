'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var getCoordinates = function (location) {
    return {
      left: location.x - parseInt(PIN_WIDTH / 2, 10),
      top: location.y - PIN_HEIGHT
    };
  };

  window.pin = {
    render: function (template, advert) {
      var pin = template.cloneNode(true);

      var coordinates = getCoordinates(advert.location);
      pin.style.left = coordinates.left + 'px';
      pin.style.top = coordinates.top + 'px';

      var img = pin.querySelector('img');
      img.src = advert.author.avatar;
      img.alt = advert.offer.title;

      pin.addEventListener('click', function () {
        window.card.render(advert);
        pin.classList.add('map__pin--active');
      });

      return pin;
    }
  };
})();
