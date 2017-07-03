 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .factory('ModelService', modelService);
  modelService.$inject = ['DataService', 'MapService'];
  function modelService(dataService, mapService) {

    var data = {
      institutes :  new Array(0),
      disciplines: new Array(0),
      instituteSelected : new Institute({}),
      filters : {
        discipline: new Array(0),
        activeDistance: new Boolean(false),
        distance: 0
      }
    };

    //Get catalogs
    var initInstitutes = function(list){
      var size = list.length - 1;
      _.forEach(list, function(ins,index) {
        var disciplinesObj = new Array();
        _.forEach(ins.disciplines, function(dis,idis){
          var disF = _.find(data.disciplines, function(o){return o.id == dis} );
          if(disF){
            disciplinesObj.push(disF);
          }
        });
        ins.disciplinesObj = disciplinesObj
        ins.distance = mapService.calculateDistance({lat: ins.lat, lng: ins.lng, innerRange: true});
        data.institutes.push(new Institute(ins));
        if(index == size){
          mapService.setFinalCalculate(true);
        }
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
          list: dataSrvc,
          assignData: data.disciplines,
          textAll: "Todas las disciplinas",
          assignFirst: data.filters.discipline
        });
      });
    }
    getDisciplines();

    var getInstitutes = function(){
     dataService.getInstitutes(function(dataSrvc){
      initInstitutes(dataSrvc);
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
  getActiveDistance : function(value){
    return data.filters.activeDistance;
  },
  calculateDistance: function(){
    mapService.resetRange();
    _.forEach(data.institutes, function(ins,index) {
        ins.distance = mapService.calculateDistance({lat: ins.lat, lng: ins.lng, innerRange: ins.showByLocation});
        if(index == data.institutes.length -1){
          mapService.setFinalCalculate(true);
        }
      });
  },
  changeInstitutes: function(){
    data.institutes[0].show = false;
    data.institutes[3].show = false;

  }
};
return modelService;



}

})();

