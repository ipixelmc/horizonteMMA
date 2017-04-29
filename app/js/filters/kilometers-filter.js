(function(angular) {
  'use strict';
  angular.module('horizonteMMAModule')
    .filter('tokilometers', function () {
      return function (distance) {
        return Math.round( distance * 0.001 * 10) / 10 + ' km';
      };
    });
})(window.angular);  