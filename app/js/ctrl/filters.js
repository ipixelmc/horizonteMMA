
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
    	modelService.getFilersInit.getDisciplines(
    		function(data) {
    			ctrl.disciplines = data;
    		}
    	);
      ctrl.distanceRange = mapService.getDistanceRange();
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

    init();

    }
  })();