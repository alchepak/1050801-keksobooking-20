'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var housingType = document.querySelector('#housing-type');

  var filterByHousingType = function (it) {
    return it.offer.type === housingType.value;
  };

  window.filter = function (data) {
    var items = data.slice();

    if (housingType.value !== DEFAULT_VALUE) {
      items = items.filter(filterByHousingType);
    }

    return items;
  };
})();
