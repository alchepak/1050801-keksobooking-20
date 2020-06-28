'use strict';

window.util = (function () {
  var MOUSE_BUTTON_CODE = 0;

  var exports = {
    isMouseDown: function (evt, callback) {
      if (evt.button === MOUSE_BUTTON_CODE) {
        callback();
      }
    },
    isEnterPress: function (evt, callback) {
      if (evt.key === 'Enter') {
        callback();
      }
    }
  };

  return exports;
})();
