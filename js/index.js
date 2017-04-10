(function(){

	var app = angular.module('nya-chan', ['angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

	app.controller('indexController',function($scope, $http){
	    $scope.time_zone = new Date().getTimezoneOffset();
	    $scope.search = function() {
	        $http({
	            method : "GET",
	            url: "https://nyachan-server.herokuapp.com/app/threads/lastDate"
	        }).then(function mySucces(response) {
	            $scope.threads = response.data;
	        }, function myError(response) {
	              console.log(response || "Request failed");
	        });
	    };
	    $scope.threads = $scope.search();

	});

})();
