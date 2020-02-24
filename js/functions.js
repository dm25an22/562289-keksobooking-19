'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  var getRandomArr = function (arr) {
    var result = [];
    var randomLength = getRandomNumber(0, arr.length);
    var arrCopy = arr.slice(0);

    while (result.length !== randomLength) {
      var randomElement = arrCopy.splice(getRandomNumber(0, arrCopy.length - 1), 1);
      randomElement = randomElement[0];
      result.push(randomElement);
    }
    return result;
  };

  var getArrRandomElements = function (max, arr) {
    var result = [];
    var length = max;
    var arrCopy = arr.slice(0);

    while (result.length !== length) {
      var randomElement = arrCopy.splice(getRandomNumber(0, arrCopy.length - 1), 1);
      randomElement = randomElement[0];
      result.push(randomElement);
    }
    return result;
  };


  var getRandomIndex = function (arr, min) {
    return arr[getRandomNumber(min, arr.length - 1)];
  };

  window.functions = {
    getRandomNumber: getRandomNumber,
    getRandomArr: getRandomArr,
    getRandomIndex: getRandomIndex,
    getArrRandomElements: getArrRandomElements
  };

})();
