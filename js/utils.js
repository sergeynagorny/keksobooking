'use strict';

(function () {

  window.utils = {
    MAP_COORD: {
      MIN: {X: 50, Y: 130},
      MAX: {X: document.querySelector('.map__pins').offsetWidth - 50, Y: 630}
    },

    removeElements: function (element) {
      if (Array.isArray(element)) {
        element.forEach(function (item) {
          item.remove();
        });
      } else {
        element.remove();
      }
    },

    setAttribute: function (element, attribute, value) {
      if (Array.isArray(element)) {
        element.forEach(function (item) {
          item.setAttribute(attribute, value);
        });
      } else {
        element.setAttribute(attribute, value);
      }
    },

    removeAttribute: function (element, attribute) {
      if (Array.isArray(element)) {
        element.forEach(function (item) {
          item.removeAttribute(attribute);
        });
      } else {
        element.removeAttribute(attribute);
      }
    },
  };

})();
