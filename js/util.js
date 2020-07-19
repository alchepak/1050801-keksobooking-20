'use strict';

(function () {
  var MOUSE_BUTTON_CODE = 0;

  window.util = {
    isMouseDown: function (evt, callback) {
      if (evt.button === MOUSE_BUTTON_CODE) {
        callback();
      }
    },
    isEnterPress: function (evt, callback) {
      if (evt.key === 'Enter') {
        callback();
      }
    },
    isEscPress: function (evt, callback) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        callback();
      }
    }
  };
})();
