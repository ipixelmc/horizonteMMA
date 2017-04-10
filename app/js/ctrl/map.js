
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('MapController', mapController);
  mapController.$inject = ['ModelService','$scope','MapService', 'NgMap'];
  function mapController(modelService,$scope, mapService,NgMap) {
    var ctrl = this;
    ctrl.userPoint;
    ctrl.originPoint;
    ctrl.centerCountry= {lat: 19.4326077, lng: -99.13320799999997};
    var map;
    NgMap.getMap().then(map => ctrl.map = map);
     var contentInfoWindiowHTML = '<div>'+
    '<label>{{ctrl.filters}}</label>'+
    '</div>';

   var init = function(){
    ctrl.institutes =  modelService.getInstitutes();
    ctrl.institudeSelected = modelService.getInstitudeSelected();
    ctrl.filters = modelService.getFilters();
    ctrl.userPoint = mapService.getUserPoint();
    ctrl.originPoint = mapService.getOriginPoint();
    var pos = ctrl.centerCountry;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        ctrl.userPoint = pos;
        mapService.setOriginPoint(pos);
        mapService.setUserPoint(pos);  
        mapService.calculateDistance();

      });
    }
    mapService.setOriginPoint(pos);
    mapService.setUserPoint(pos);  
    mapService.calculateDistance();

    ctrl.setUserPotition = function(){
      mapService.setOriginPoint(ctrl.userPoint);
    }

    var refreshMarkers = function(){
      if(ctrl.map){
       for (var key in ctrl.map.customMarkers) {
        var ins = _.find(ctrl.institutes, function(o){return o.id == key} );
         if(ins.showByDiscipline && ins.showByDistance && ins.showByLocation){
          ctrl.map.customMarkers[key].setMap(ctrl.map);
          }else{
            ctrl.map.customMarkers[key].setMap(null);
          }
          
        }; 
      }
    }

    $scope.$watch('ctrl.filters', function(newValue, oldValue) {
      refreshMarkers();
    },true);
  }
  init();

}

})();