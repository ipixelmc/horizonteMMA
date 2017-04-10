
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('FiltersController', homeController);
  homeController.$inject = ['ModelService', 'MapService'];
  function homeController(modelService, mapService) {
    var ctrl = this;
    ctrl.model= {};
    var slider;

    var init = function(){
    	ctrl.disciplines = modelService.getDisciplines();
      ctrl.model = modelService.getFilters();
      //ctrl.model.discipline = ctrl.disciplines[0] ? ctrl.disciplines[0] : {};
      ctrl.distanceRange = mapService.getDistanceRange();
      ctrl.institutes = modelService.getInstitutes();
      ctrl.userPoint = mapService.getUserPoint();
    }

    ctrl.changeInstitutes = function(){
      console.log(ctrl.distanceRange);
      modelService.changeInstitutes();
    }

    ctrl.initSlider = function () {

      slider = new Slider('#range-distance',{
        max: ctrl.distanceRange.max,
        min: ctrl.distanceRange.min,
        dataSliderStep: 10,
        focus: true,
        value: [ctrl.distanceRange.max,ctrl.distanceRange.min]
      });
    }

    ctrl.places = {};
    ctrl.places.show =false;

    ctrl.searchPlaces = function () {
      if(ctrl.model.location != ""){
        mapService.searchPlace(
          ctrl.model.location,
          function(data){
            ctrl.places.show =true;
            ctrl.places.list = data.results;
          },
          function(error){
            console.log(error);
            ctrl.messageErrorSearch = "Ocurrió un error al búscar lugares cercanos";
          }
          )
      }else{
        ctrl.places.show = false;
         _.forEach(ctrl.institutes, function(el) {
          _.set(el, 'showByLocation', true);
        });
         setOriginPoint(ctrl.userPoint);
      }
    }

    ctrl.filterByDiscipline = function(){
      if(ctrl.model.discipline.id > 0){
        _.forEach(ctrl.institutes, function(el) {
          var dis = _.find(el.disciplinesObj, function(o){return ctrl.model.discipline.id == o.id} );
          if (dis){
            _.set(el, 'showByDiscipline', true);
          }else{
            _.set(el, 'showByDiscipline', false);
          }
          
        });
      }else{
        _.forEach(ctrl.institutes, function(el) {
          _.set(el, 'showByDiscipline', true);
        });
      }
      
    }

    ctrl.filterByLocation = function(){
      if(ctrl.locationSelected.formatted_address){
        var boundsPoint = ctrl.locationSelected.geometry.bounds;
        var bounds = new google.maps.LatLngBounds(boundsPoint.southwest, boundsPoint.northeast);
        
        _.forEach(ctrl.institutes, function(el) {
          if(bounds.contains({lat: el.lat, lng: el.lng})){
            _.set(el, 'showByLocation', true);
          }else{
            _.set(el, 'showByLocation', false);
          }
      });
      }else{
       _.forEach(ctrl.institutes, function(el) {
        _.set(el, 'showByLocation', true);
      }); 
     }
   }

   var setOriginPoint = function(point){
     mapService.setOriginPoint(point);
     mapService.setFinalCalculate(false);
     mapService.calculateDistance();
     mapService.setFinalCalculate(true);
   }

   ctrl.setPlace = function(place){
     console.log("aplicando");
     ctrl.locationSelected = place;
     setOriginPoint(ctrl.locationSelected.geometry.location);
     ctrl.filterByLocation();
    
   }

   init();

 }
})();