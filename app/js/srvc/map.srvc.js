 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .service('MapService', mapService);
  mapService.$inject = ['$http'];
  function mapService($http) {
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    
    var distanceRange = new Distance({});
    var mapService = {
      calculateDistance : function(origin,point){
      var R = 6371e3; // metres
      var φ1 = deg2rad(origin.lat);
      var φ2 = deg2rad(point.lat);
      var Δφ = deg2rad(point.lat-origin.lat);
      var Δλ = deg2rad(point.lng-origin.lng);

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = R * c;
      distanceRange.max = d>distanceRange.max ? d: distanceRange.max;
      distanceRange.min = distanceRange.min==0 || d<distanceRange.min ? d: distanceRange.min;
      return d;
    },
    getDistanceMax : function(){
      return distanceRange.max;
    },
    getDistanceMin : function () {
      return distanceRange.min;
    },
    getDistanceRange : function () {
      return distanceRange;
    },
    setFinalCalculate : function (status) {
      distanceRange.status = status;
    }
  };
  return mapService;



}

})();
