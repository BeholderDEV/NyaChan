(function(){
    var app = angular.module('nya-chan',[]);

    app.controller('threadController',function($scope, $http){

        $scope.search = function() {
            console.log("entrou na função");
            $http({
                method : "GET",
                url : "http://127.0.0.1:3000/a/threads"
                //url: "https://nyachan-server.herokuapp.com/a/threads"
            }).then(function mySucces(response) {
                $scope.threads = JSON.parse(response.data);
                console.log($scope.threads);
            }, function myError(response) {
                  console.log(response || "Request failed");
            });
        };
        $scope.threads = $scope.search();

        $scope.searchThread = function() {
            console.log("entrou na função");
            $http({
                method : "GET",
                url : "http://127.0.0.1:3000/a/thread/1"
                //url: "https://nyachan-server.herokuapp.com/a/threads"
            }).then(function mySucces(response) {
                $scope.threads = JSON.parse(response.data);
                console.log($scope.threads);
            }, function myError(response) {
                  console.log(response || "Request failed");
            });
        };
        $scope.thread = $scope.searchThread();
    });

})();
