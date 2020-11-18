'use strict';

(function () {
  var SERVER_URL = 'https://javascript.pages.academy/keksobooking';
  var STATUS_CODE = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено',
  };

  var setupRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 1000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(STATUS_CODE[xhr.status] || 'Статус овтета: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setupRequest(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = setupRequest(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    errorHandler: function (message) {
      var node = document.createElement('div');
      node.classList.add('error-message');
      node.textContent = message;
      document.body.appendChild(node);
    },
  };
})();

