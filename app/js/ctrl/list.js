
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('ListController', listController);
  listController.$inject = ['ModelService'];
  function listController(modelService) {
    var ctrl = this;
   	var init = function(){
   		modelService.getInstitutes(
   			function(data){
   				ctrl.institutes = data;
   			});
   	}

   	init();

    }

  })();