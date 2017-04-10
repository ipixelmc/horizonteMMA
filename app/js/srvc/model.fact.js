 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .factory('ModelService', modelService);
  modelService.$inject = ['DataService'];
  function modelService(dataService) {
    
    var data = {
      institutes :  new Array(0),
      disciplines: new Array(0),
      instituteSelected : new Institute({}),
      filters : {discipline: new Object()}
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
    var initCatalog = function(params){
      if(params.textAll){
        params.assignData.push({id: -1, name: params.textAll});
      }
      angular.forEach(params.list, function(el, key){
        params.assignData.push(el);
      });
      if(params.assignFirst){

        params.assignFirst.id = params.assignData[0].id;
        params.assignFirst.name = params.assignData[0].name;
      }
    }
    
    var getDisciplines = function(){
      dataService.getDisciplines(function(dataSrvc){
        
        initCatalog({
          list: dataSrvc.catalog,
          assignData: data.disciplines,
          textAll: "Todas las disciplinas",
          assignFirst: data.filters.discipline
        });
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
    getDisciplines : function(callback){
     return data.disciplines;
   },
   getInstitutes : function(){
    return data.institutes;
  },
  getFilters : function(){
    return data.filters;
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

