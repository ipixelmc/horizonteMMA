 
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .service('DataService', dataService);
  dataService.$inject = ['$http'];
  function dataService($http) {
    var develoment = false;
    //urls
    // var filtersUrl = {
    //   discipline: develoment ? "/data/discipline.json" : "http://www.horizontemma.com/?rest_route=/wp/v2/disciplinas"
    // };
    // var instituteUrl = develoment ? "/data/institutes.json" : "http://www.horizontemma.com/?rest_route=/wp/v2/academias";

    var filtersUrl = {
      discipline: develoment ? "/data/discipline.json" : "http://localhost:8888/hmma/?rest_route=/wp/v2/disciplinas"
    };
    var instituteUrl = develoment ? "/data/institutes.json" : "http://localhost:8888/hmma/?rest_route=/wp/v2/academias";
    
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
