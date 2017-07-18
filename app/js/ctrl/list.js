
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('ListController', listController);
  listController.$inject = ['ModelService', 'tokilometersFilter', '$scope', '$rootScope'];
  function listController(modelService, tokilometersFilter, $scope, $rootScope) {
    var ctrl = this;
    ctrl.hoverNew = 0;
    ctrl.tamMax = 5;
    ctrl.showButtonMore = true;
    var init = function(){
      ctrl.institutes = modelService.getInstitutes();
      console.log(ctrl.institutes);
      ctrl.filters = modelService.getFilters();
    }

    ctrl.changeHover = function(index){
      ctrl.hoverOld = ctrl.hoverNew;
      ctrl.hoverNew = index;
      ctrl.institutes[ctrl.hoverOld].inHover = false;
      ctrl.institutes[ctrl.hoverNew].inHover = true;
    }

    ctrl.resetScroll = function(){
      ctrl.tamMax = 5;
      ctrl.showButtonMore = ctrl.tamMax<ctrl.institutes.length;
    }

    ctrl.showMoreFn = function(){
      ctrl.tamMax += 5;
      ctrl.showButtonMore = ctrl.tamMax<ctrl.institutes.length;
    }

    ctrl.listFilterFn = function(ins,index){
      var showByFilters = ins.showByDiscipline && ins.showByLocation && ins.showByDistance;
      if(showByFilters && index <ctrl.tamMax){
        return true;
      }
      return false;
    }

    ctrl.toggleFilter = function(type){
      $rootScope.$broadcast('filters.open', type);
    }

    init();

  }

})();

