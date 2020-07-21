'use strict';

(function () {
  var MIN_TOP = 130;
  var MAX_TOP = 630;

  var PinOption = {
    WIDTH: 65,
    HEIGHT: 65,
    ARROW: 16,
    TOP: 375,
    LEFT: 570
  };

  var pin = document.querySelector('.map__pin--main');
  var boxWidth = window.map.getWidth() - Math.floor(PinOption.WIDTH / 2);
  var pinDelta = PinOption.HEIGHT + PinOption.ARROW;

  var getCoordinates = function (evt, start) {
    return {
      x: start ? start.x - evt.clientX : evt.clientX,
      y: start ? start.y - evt.clientY : evt.clientY
    };
  };

  var calcCoordinatesInBox = function (shift) {
    var left = pin.offsetLeft - shift.x;
    var top = pin.offsetTop - shift.y;

    return {
      x: Math.max(0 - Math.floor(PinOption.WIDTH / 2), Math.min(boxWidth, left)),
      y: Math.max(MIN_TOP - pinDelta, Math.min(MAX_TOP - pinDelta, top))
    };
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    window.util.isMouseDown(evt, window.page.activate);
    var startCoordinates = getCoordinates(evt);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = getCoordinates(moveEvt, startCoordinates);
      startCoordinates = getCoordinates(moveEvt);

      var newCoordinates = calcCoordinatesInBox(shift);
      pin.style.top = newCoordinates.y + 'px';
      pin.style.left = newCoordinates.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setCurrentAddress(true);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pin.addEventListener('mousedown', onMouseDown);
  pin.addEventListener('keydown', function (evt) {
    window.util.isEnterPress(evt, window.page.activate);
  });

  window.mainPin = {
    getPosition: function (isPageActive) {
      var position = {
        x: Math.floor(parseInt(pin.style.left, 10) + PinOption.WIDTH / 2),
        y: Math.floor(parseInt(pin.style.top, 10) + PinOption.HEIGHT / 2)
      };

      if (isPageActive) {
        position.y += Math.ceil(PinOption.HEIGHT / 2 + PinOption.ARROW);
      }

      return position;
    },
    reset: function () {
      pin.style.top = PinOption.TOP + 'px';
      pin.style.left = PinOption.LEFT + 'px';
    }
  };
})();
