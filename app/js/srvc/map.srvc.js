 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .service('MapService', mapService);
  mapService.$inject = ['$http'];
  function mapService($http) {
    var API_KEY = "AIzaSyD5JToX3gMDJdSG_CX1UmTPx5TIVZTuso8";
    var urlSearchPlace = "https://maps.googleapis.com/maps/api/geocode/json?"+
    "address=STRING"+
    "&components=country:MX"+
    "&key=API_KEY";
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    
    var distanceRange = new Distance({});
    var originPoint = new Object({});
    var userPoint = new Object();

    var calculateDistance = function(point){
      var R = 6371e3; // metres
      var φ1 = deg2rad(originPoint.lat);
      var φ2 = deg2rad(point.lat);
      var Δφ = deg2rad(point.lat-originPoint.lat);
      var Δλ = deg2rad(point.lng-originPoint.lng);

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = Math.ceil(R * c ) / 1000; //distancia en kilometros

      if(point.innerRange){
        distanceRange.max = d>distanceRange.max ? d: distanceRange.max;
        distanceRange.min = distanceRange.min==0 || d<distanceRange.min ? d: distanceRange.min;
      }
      return d;
    }
    var mapService = {
     
      calculateDistance : function(point){
         return calculateDistance(point);     
      },
      resetRange : function(){
        distanceRange.max = 0;
        distanceRange.min = 0;
        distanceRange.status = false;
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
      },
      setUserPoint: function(point){
        userPoint.lat = point.lat;
        userPoint.lng =  point.lng;
      },
      getUserPoint: function(){
        return userPoint;
      },
      setOriginPoint : function(point){
        originPoint.lat = point.lat;
        originPoint.lng = point.lng;
      },
      getOriginPoint : function(){
        return originPoint;
      },
      searchPlace: function (text, callbackSuccess, callbackFail) {
        var urlFinal ="";
        urlFinal = urlSearchPlace.replace("API_KEY",API_KEY);
        urlFinal = urlFinal.replace("STRING", text);
      //urlFinal = urlFinal.replace("LOCATION_POINT",originPoint.lat+","+originPoint.lng);
      $http({
        method: 'GET',
        url: urlFinal
      }).then(function successCallback(response) {
        callbackSuccess(response.data);
      }, function errorCallback(response) {
        callbackFail(response);
      });
    }
  };
  return mapService;



}

})();
