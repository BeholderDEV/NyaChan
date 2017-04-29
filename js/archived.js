(function(){

	var app = angular.module('nya-chan', ['angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.controller('archivedController',function($scope, $http){
      var url = $(location).attr('href');
      var searchTag = url.substring(url.lastIndexOf('/') + 1);
      $http({
          method : "GET",
          url: "https://nyachan-server.herokuapp.com/api/threads/" + searchTag+"?sortType=lastDate&archived=true"
      }).then(function mySucces(response) {
          $scope.threads = response.data;
      }, function myError(response) {
          $window.location.href="https://nyachan-server.herokuapp.com/404";
      });
    });

})();
