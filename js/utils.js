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

    getShuffleArray: function (array) {
      var j;
      var x;
      var i;

      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
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

    getRandomInteger: function (min, max) {
      var randomInteger = min + Math.random() * (max + 1 - min);
      return Math.floor(randomInteger);
    },

    getRandomItem: function (arr) {
      var randomItem = arr[this.getRandomInteger(0, arr.length - 1)];
      return randomItem;
    },

    getRandomItems: function (arr) {
      var randomItems = [];
      for (var i = 0; i < arr.length; i++) {
        if (Math.round(Math.random())) {
          randomItems.push(arr[i]);
        }
      }
      return randomItems;
    },
  };

})();
