'use strict';

(function () {
  var onMessageEscPress = function (evt) {
    window.util.isEscPress(evt, window.message.close);
  };

  window.message = {
    show: function (isSuccess, messageText) {
      var type = isSuccess ? 'success' : 'error';
      var className = '.' + type;
      var template = document.querySelector('#' + type).content;
      var block = template.querySelector(className).cloneNode(true);

      if (messageText) {
        block.querySelector(className + '__message').textContent = messageText;
      }

      document.body.appendChild(block);

      var button = block.querySelector(className + '__button');
      if (button) {
        button.addEventListener('click', function () {
          window.message.close();
        });
      }

      block.addEventListener('click', function () {
        block.remove();
      });

      document.addEventListener('keydown', onMessageEscPress);
    },
    close: function () {
      var message = document.querySelector('.success, .error');

      document.removeEventListener('keydown', onMessageEscPress);
      if (message !== null) {
        message.remove();
      }
    }
  };
})();
