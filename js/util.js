'use strict';

(function () {
  var MOUSE_BUTTON_CODE = 0;
  var DEBOUNCE_INTERVAL = 500;

  var debounceTimeout = null;

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
    },
    debounce: function (callback) {
      if (debounceTimeout) {
        window.clearTimeout(debounceTimeout);
      }

      debounceTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    }
  };
})();
