
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('MainController', mainController);
  mainController.$inject = [];
  function mainController() {

    var ctrl = this;

    ctrl.page = {
    	mapActive: false,
    	filters: ''
    }

    ctrl.toggleView = function(){
    	console.log('test');
    	ctrl.page.mapActive = !ctrl.page.mapActive;
    }

  }

})();