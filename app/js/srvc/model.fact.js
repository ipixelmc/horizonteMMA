 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .factory('ModelService', modelService);
  modelService.$inject = ['DataService'];
  function modelService(dataService) {
    //filters
    var filters = {};
    var data = {
      institutes :  new Array(0),
      disciplines: new Array(0),
      instituteSelected : new Institute({})
    };

    //Get catalogs
    var initInstitutes = function(list){
      angular.forEach(list, function(el, key){
        var disciplinesObj = new Array();
        angular.forEach(el.disciplines,function(dis,key){
          var dis = _.find(data.disciplines, function(o){return o.id == dis} );
          if(dis){
            disciplinesObj.push(dis);
          }
        });
        el.disciplinesObj = disciplinesObj;
        data.institutes.push(new Institute(el));
      });
    }
   var initCatalog = function(list,assignData){
      angular.forEach(list, function(el, key){
        assignData.push(el);
      });
    }
    
    var getDisciplines = function(){
      dataService.getDisciplines(function(dataSrvc){
            initCatalog(dataSrvc.catalog,data.disciplines);
          });
    }
    getDisciplines();

    var getInstitutes = function(){
       dataService.getInstitutes(function(dataSrvc){
            initInstitutes(dataSrvc.institutes);
        });
    }

    getInstitutes();

    var modelService = {
      getFilersInit : {
        getDisciplines : function(functionAssignModel){
           functionAssignModel(data.disciplines);
        }
      },
      getInstitutes : function(functionAssignModel){
        functionAssignModel(data.institutes);
      },
      getInstitudeSelected: function(){
        return data.instituteSelected;
      },
      changeInstitutes: function(){
        data.institutes[0].show = false;
        data.institutes[3].show = false;
         
      }
   };
   return modelService;



 }

})();

