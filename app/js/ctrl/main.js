
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('MainController', mainController);
  mainController.$inject = [];
  function mainController() {

    var ctrl = this;

    ctrl.page = {
    	mapActive: false,
    	listActive: true,
    	filters: ''
    }

    ctrl.toggleView = function(){
    	console.log(ctrl.page.mapActive, 'map');
    	if (ctrl.page.mapActive == true) {
    		ctrl.page.mapActive = false;
    		// $timeout(function() {
    			ctrl.page.listActive = true;
    			// $scope.$apply();
    		// }, 25);
    	} else {
    		ctrl.page.listActive = false;
    		// $timeout(function() {
    			ctrl.page.mapActive = true;
    		// }, 25);
    	}
    }

  }

})();