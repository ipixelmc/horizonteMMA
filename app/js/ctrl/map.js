
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('MapController', mapController);
  mapController.$inject = ['ModelService','$scope','MapService', 'NgMap'];
  function mapController(modelService,$scope, mapService,NgMap) {

    var ctrl = this;
    ctrl.userPoint;
    ctrl.originPoint;
    ctrl.centerCountry = {lat: 19.4326077, lng: -99.1332071};
    var map;
    NgMap.getMap().then(function(map){ctrl.map = map});

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
          setPoint(pos);
         // ctrl.institutes.push({id:6465461, point: pos, name: 'Tú ubicación'});
        },
        function(error){
          setPoint(ctrl.centerCountry);
        });
      }

      $scope.$watch('ctrl.filters', function(newValue, oldValue) {
        refreshMarkers();
        // setPoint(ctrl.userPoint);
      },true);

    }

    var setPoint = function(point){
      NgMap.getMap().then(function(map) {
        var latlng = new google.maps.LatLng(point.lat, point.lng);
        map.setCenter(latlng);
        map.setZoom(11);
      });
      mapService.setOriginPoint(point);
      mapService.setUserPoint(point);  
      modelService.calculateDistance();
    }

    ctrl.setUserPotition = function(){
      setPoint(ctrl.userPoint);
    }

    var refreshMarkers = function(){
      if(ctrl.map){
        ctrl.map.hideInfoWindow('infoinstitute');
        for (var key in ctrl.map.customMarkers) {
          var id = parseInt(key.replace("marker_",""));
          var ins = _.find(ctrl.institutes, function(o){return o.id == id} );
          if(ins){
            if(ins.showByDiscipline && ins.showByDistance && ins.showByLocation) {
              ctrl.map.customMarkers[key].setMap(ctrl.map);
            } else {
              ctrl.map.customMarkers[key].setMap(null);
            }  
          }
      }; 
    }

  }

  ctrl.showInfoWindow = function(evt, index) {
    ctrl.ins = ctrl.institutes[index];
    ctrl.map.showInfoWindow('infoinstitute', 'marker_'+ctrl.ins.id);
  };

  init();

  }

})();