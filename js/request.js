'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var buildRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.request = {
    load: function (onSuccess, onError) {
      var xhr = buildRequest(onSuccess, onError);
      xhr.open('GET', LOAD_URL);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = buildRequest(onSuccess, onError);
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    }
  };
})();
