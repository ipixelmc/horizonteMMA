 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .service('DataService', dataService);
  dataService.$inject = ['$http'];
  function dataService($http) {
    //urls
    var filtersUrl = {
      discipline: "/data/discipline.json"
    };
    var instituteUrl = "/data/institutes.json";
    var errorCallbackService = function (error) {
      console.log("Ha ocurrido un error en la petición");
      console.log(error);
    }
    var getData = function (request) {

      $http({
        method: 'GET',
        url: request.url
      }).then(function successCallback(response) {
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
