
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('ListController', listController);
  listController.$inject = ['ModelService'];
  function listController(modelService) {
    var ctrl = this;
    ctrl.hoverNew = 0;
   	var init = function(){
   		 ctrl.institutes = modelService.getInstitutes();
       ctrl.filters = modelService.getFilters();
   	}

    ctrl.changeHover = function(index){
      ctrl.hoverOld = ctrl.hoverNew;
      ctrl.hoverNew = index;
      ctrl.institutes[ctrl.hoverOld].inHover = false;
      ctrl.institutes[ctrl.hoverNew].inHover = true;
    }

   	init();

    }

  })();