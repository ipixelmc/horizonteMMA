
(function() {
  'use strict';
  angular.module('horizonteMMAModule')
  .controller('MapController', mapController);
  mapController.$inject = ['ModelService','$scope','MapService'];
  function mapController(modelService,$scope, mapService) {
    var ctrl = this;
    ctrl.pointUser;
    var map;

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    };

    var contentInfoWindiowHTML = '<div>'+
    '<label ng-if="ctrl.institudeSelected.id == ctrl.institutes[<<id>>]">Soy yo</label>'+
    '<label>{{ctrl.institutes[<<id>>].name}}</label>'
    '</div>';
    

    $scope.initialize = function() {
      map = new google.maps.Map(document.getElementById('map-search'),{
        center: {lat: 19.4326077, lng: -99.13320799999997},
        zoom: 11
      });
      var infoWindow = new google.maps.InfoWindow({map: map});
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          ctrl.pointUser = pos;
          $scope.$apply(function () {
            for(var i = 0 ; i<ctrl.institutes.length; i++){
              ctrl.institutes[i].distance = mapService.calculateDistance(ctrl.pointUser,ctrl.institutes[i]);
            }    
          });
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
          $scope.$apply(function () {
              for(var i = 0 ; i<ctrl.institutes.length; i++){
                ctrl.institutes[i].distance = mapService.calculateDistance(ctrl.pointUser,ctrl.institutes[i]);
              }    
              mapService.setFinalCalculate(true);
          });
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        initPointsInstitute();
      };    
      google.maps.event.addDomListener(window, 'load', $scope.initialize);   

      var infowindow = new google.maps.InfoWindow();
      var initPointsInstitute = function(){
       // var infoWindow = new google.maps.InfoWindow({map: map});

       angular.forEach(ctrl.institutes, function(el,key){
         el.infoWindow  = new google.maps.InfoWindow({
          content: el.name,
          map: map
        });
         el.infoWindow.setPosition({lat: el.lat, lng: el.lng});

       });


     };
     var init = function(){
       modelService.getInstitutes(
        function(data){
         ctrl.institutes = data;
       });
       ctrl.institudeSelected = modelService.getInstitudeSelected();
     }
     init();

   }

 })();