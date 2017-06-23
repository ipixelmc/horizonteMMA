 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .service('DataService', dataService);
  dataService.$inject = ['$http'];
  function dataService($http) {
    var prod = true;
    
    var filtersUrl = {
      discipline: 
        prod ? 
        '/wp-content/themes/gloria-child/map/json/disciplinas.json' : 
        'http://localhost:8888/hm/wp-content/themes/gloria-child/map/json/disciplinas.json'
    };
    
    var instituteUrl = 
          prod ? 
          "/wp-content/themes/gloria-child/map/json/academias.json" : 
          "http://localhost:8888/hm/wp-content/themes/gloria-child/map/json/academias.json";
    
    var errorCallbackService = function (error) {
      console.log("Ha ocurrido un error en la petición");
      console.log(error);
    }
    var getData = function (request) {
      $http({
        method: 'GET',
        url: request.url,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {
        console.log(response);
          request.model(response.data);
      }, function errorCallback(response) {
       errorCallbackService(response);
      });
    }

    var dataService = {
      getDisciplines : function(functionAssign){
        getData({url: filtersUrl.discipline, model: functionAssign});
      },
      getInstitutes : function(functionAssign){
        getData({url: instituteUrl, model: functionAssign});
      }
    };

    return dataService;

  }

})();
