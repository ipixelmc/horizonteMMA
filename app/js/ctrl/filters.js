
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('FiltersController', homeController);
  homeController.$inject = ['ModelService', 'MapService','$scope','$timeout'];
  function homeController(modelService, mapService, $scope, $timeout) {
    var ctrl = this;
    ctrl.model = {};
    var slider;

    ctrl.disciplinesArray = {
      data: [],
      toggle: function(id) {
        var exist = ctrl.disciplinesArray.data.indexOf(id);
        if (exist > -1) {
          ctrl.disciplinesArray.data.splice(exist, 1);
        } else {
          ctrl.disciplinesArray.data.push(id);
        }
      }
    };

    ctrl.overlay = {
      active: false,
      visible: false
    }

    var init = function(){
    	ctrl.disciplines = modelService.getDisciplines();
      ctrl.model = modelService.getFilters();
      //ctrl.model.discipline = ctrl.disciplines[0] ? ctrl.disciplines[0] : {};
      ctrl.distanceRange = mapService.getDistanceRange();
      ctrl.institutes = modelService.getInstitutes();
      ctrl.userPoint = mapService.getUserPoint();
      //ctrl.activeDistance = modelService.getActiveDistance();
      ctrl.showDetailed = false;
    }

    ctrl.initSlider = function () {
      ctrl.distance = ctrl.distanceRange.max;
      ctrl.model.distance = ctrl.distance;
      ctrl.sliderOptions = {
        floor: 0,
        ceil: ctrl.distanceRange.max,
        showSelectionBar: true,
        step: ctrl.distance / 10 ,
        //showTicks: true,
        onChange : function(){
          ctrl.model.distance = ctrl.distance;
          filterByDistance();
        }
      };
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    }

    var filterByDistance = function(){
      _.forEach(ctrl.institutes, function(el) {
        if(el.distance <= ctrl.distance){
          _.set(el, 'showByDistance', true);  
        }else{
          _.set(el, 'showByDistance', false);
        } 
      });
    }
    ctrl.activateDistance = function(){
      if(ctrl.activeDistance==true){
        ctrl.initSlider(); 
        ctrl.model.activeDistance = true;
        filterByDistance();  
      }else{
        ctrl.model.activeDistance = false;
        _.forEach(ctrl.institutes, function(el) {
          _.set(el, 'showByDistance', true);
        });
      }

    }

    ctrl.places = {};
    ctrl.places.show = false;
    ctrl.applyFilterPlace = false;

    ctrl.getShowInstitutes = function(){
      return _.filter(ctrl.institutes, 
        function(o) { 
          return o.showByDiscipline && o.showByLocation && o.showByDistance 
        }).lenght;
    }

    ctrl.searchPlaces = function () {
      if(ctrl.txtLocation != ""){
        mapService.searchPlace(
          ctrl.txtLocation,
          function(data){
            ctrl.places.show =true;
            ctrl.places.list = data.results;
          },
          function(error){
            console.log(error);
            ctrl.messageErrorSearch = "Ocurrió un error al búscar lugares cercanos";
          }
          )
        ctrl.applyFilterPlace = true;
      }else{
        ctrl.applyFilterPlace = false;
        ctrl.model.changeLocation = !ctrl.model.changeLocation;
        ctrl.places.show = false;
        _.forEach(ctrl.institutes, function(el) {
          _.set(el, 'showByLocation', true);
        });
        setOriginPoint(ctrl.userPoint);
        ctrl.activeDistance = false;
        ctrl.activateDistance();
      }
    }

    ctrl.filterByDiscipline = function(){

      // if (ctrl.model.discipline.id > 0){
      if (ctrl.disciplinesArray.data.lenght > 0) {
        _.forEach(ctrl.institutes, function(el) {
          var dis = _.find(el.disciplinesObj, function(o){
            return ctrl.disciplinesArray.data.indexOf(disciplina.id) > -1 ? true:false
            // return ctrl.model.discipline.id == o.id;
          } );
          if (dis){
            _.set(el, 'showByDiscipline', true);
          }else{
            _.set(el, 'showByDiscipline', false);
          }

        });
      } else {
        _.forEach(ctrl.institutes, function(el) {
          _.set(el, 'showByDiscipline', true);
        });
      }
    }

    ctrl.filterByLocation = function(){
      if(ctrl.locationSelected.formatted_address){
        ctrl.txtLocation = ctrl.locationSelected.formatted_address;
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

   }

   ctrl.setPlace = function(place){
     console.log("aplicando");
     ctrl.locationSelected = place;
     setOriginPoint(ctrl.locationSelected.geometry.location);
     ctrl.filterByLocation();
     modelService.calculateDistance();
     ctrl.activateDistance();
   }

   ctrl.resetLocation = function(){
    ctrl.txtLocation = '';
    ctrl.searchPlaces();
   }

   ctrl.resetDistance = function(){
    ctrl.activeDistance = false;
    ctrl.activateDistance();
   }

   ctrl.resetDiscipline = function(){
    ctrl.model.discipline = ctrl.disciplines[0]; //borrar
    ctrl.disciplinesArray.data = [];
    ctrl.filterByDiscipline();
   }

   init();

 }
})();