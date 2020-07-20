'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var ARROW_HEIGHT = 16;
  var MIN_TOP = 130;
  var MAX_TOP = 630;

  var pin = document.querySelector('.map__pin--main');
  var boxWidth = window.map.getWidth() - Math.floor(PIN_WIDTH / 2);
  var pinDelta = PIN_HEIGHT + ARROW_HEIGHT;

  var calcPositionInBox = function (shift) {
    var left = pin.offsetLeft - shift.x;
    var top = pin.offsetTop - shift.y;

    return {
      x: Math.max(0 - Math.floor(PIN_WIDTH / 2), Math.min(boxWidth, left)),
      y: Math.max(MIN_TOP - pinDelta, Math.min(MAX_TOP - pinDelta, top))
    };
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var position = calcPositionInBox(shift);
      pin.style.top = position.y + 'px';
      pin.style.left = position.x + 'px';
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

  window.mainPin = {
    getPosition: function (isPageActive) {
      var position = {
        x: Math.floor(parseInt(pin.style.left, 10) + PIN_WIDTH / 2),
        y: Math.floor(parseInt(pin.style.top, 10) + PIN_HEIGHT / 2)
      };

      if (isPageActive) {
        position.y += Math.ceil(PIN_HEIGHT / 2 + ARROW_HEIGHT);
      }

      return position;
    }
  };
})();
