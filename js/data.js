'use strict';

(function () {
  window.data = {
    addLeadZero: function (num, size) {
      var result = num.toString();
      while (result.length < size) {
        result = '0' + result;
      }

      return result;
    },
    generateRandomNumber: function (minValue, maxValue) {
      var randomValue = Math.floor(Math.random() * (maxValue));
      if (randomValue < minValue) {
        return minValue;
      }

      return randomValue;
    },
    getRandomValue: function (items) {
      var index = Math.random() * items.length;
      return items[Math.floor(index)];
    },
    getRandomProperty: function (object) {
      var keys = Object.keys(object);
      return window.data.getRandomValue(keys);
    },
    getRandomArray: function (items) {
      var length = window.data.generateRandomNumber(0, items.length);

      var result = [];
      for (var i = 0; i < length; i++) {
        var value = window.data.getRandomValue(items);
        if (result.indexOf(value) < 0) {
          result.push(value);
        }
      }

      return result;
    }
  };
})();
